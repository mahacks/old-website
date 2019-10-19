function getParameterByName(name) {
	var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search)
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

$(document).ready(function() {
	if (getParameterByName('email')) {
		let email = getParameterByName('email')
		window.history.pushState('rsvp', 'RSVP', '/rsvp')
		$('#email').val(email)
	}

	$('#rsvp-form').submit(function(event) {
		event.preventDefault()

		var formData = {}

		$('#rsvp-form')
			.serializeArray()
			.forEach(object => (formData[object.name] = object.value))

		axios
			.post('https://api.mahacks.com/data/rsvp', formData, {validateStatus: false})
			.then(response => {
				if (response.status == 400) {
					$('.container').html(`
					<div class="centered">
						<h2 style="color: white">Sorry to hear that we won't see you 💔</h2>
						<p style="color: white;">Be sure to apply next year!</p>
					</div>
				`)
				}

				if (response.status == 401) {
					$('.container').html(`
						<div class="centered">
							<h2 style="color: white;">You've already RSVP'd</h2>
						</div>
						`)
				}

				if (response.status == 200) {
					$('.container').html(`
						<div class="centered">
							<h2 style="color: white;">🥳 Thanks for RSVPing to MAHacks! 🥳</h2>
							<p style="color: white;">We're excited to see you on the 26th.</p>
						</div>
						`)
				}
			})
	})

	$('#register-form').submit(function(event) {
		// don't do the actual html submit
		event.preventDefault()

		// empty object for form data
		var formData = {}

		// populate object with form data
		$('#register-form')
			.serializeArray()
			.forEach(object => (formData[object.name] = object.value))

		axios
			.post('https://api.mahacks.com/data/apply', formData)
			.then(response => {
				if (response.status == 200) {
					$('.container').html(`
					<div class="centered">
						<h2 style="color: white;">🎉 Congrats! You're registered for MAHacks V. 🎉</h2>
    					<p style="color: white;">We'll reach out to you once we get closer to the event with more information. See you in October!</p>
					</div>
				`)
				}
			})
	})
})

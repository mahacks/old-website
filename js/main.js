console.log('executing...')

$(document).ready(function() {
	$('#register-form').submit(function(event) {
		// don't do the actual html submit
		event.preventDefault()

		// empty object for form data
		var formData = {}

		// populate object with form data
		$('#register-form')
			.serializeArray()
			.forEach(object => (formData[object.name] = object.value))

		axios.post('https://api.mahacks.com/data/apply', formData).then((response) => {
			if(response.status == 200) {
				$('.container').html(`
<div class="centered">
							<h2 style="color: white;">🎉 Congrats! You're registered for MAHacks V. 🎉</h2>
    <p style="
    color: white;
">We'll reach out to you once we get closer to the event with more information. See you in October!</p>
    
						</div>
					`)
			}
		})
	})
})

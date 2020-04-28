<template>
    <div class="bg-lightgrey">
        <div class="container">
            <div class="row py-5">
                <div class="col-12 mb-5 text-center">
                    <h1 class="display-4">CONTACT</h1>
                    <p class="lead">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non earum libero et culpa inventore nemo sunt iure asperiores, beatae laudantium, maxime amet voluptatem iusto officiis, provident deleniti eaque voluptates doloremque.</p>
                </div>
                <div class="col-12">
                    <form>
                        <div class="form-row">
                            <div class="form-group col-12 col-md-6">
                                <label for="name">Name</label>
                                <input id="name" type="text" placeholder="Name" class="form-control">
                            </div>
                            <div class="form-group col-12 col-md-6">
                                <label for="email">Email</label>
                                <input id="email" type="text" placeholder="Email" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="subject">Subject</label>
                            <input id="subject" type="text" placeholder="Subject" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="message">Message</label>
                            <textarea id="message" type="text" placeholder="Email" rows="6" class="form-control"/>
                        </div>
                        <div class="form-check">
                            <input type="checkbox" name="consent" id="consent" class="form-check-input">
                            <label for="consent" class="form-check-label">Accept terms and conditions</label>
                        </div>
                        <button class="btn btn-dark mt-3">SUBMIT</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            form: {
                name:"",
                subject:"",
                message:"",
                email:""
            }
        }
    }
}
</script>

<style scoped>
.form-group, .form-check {
    text-transform: uppercase;
    letter-spacing: 0.2rem;
}
</style>
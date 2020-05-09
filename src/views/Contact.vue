<template>
    <div class="bg-lightgrey">
        <div class="container">
            <div v-if="!messageSent" class="row py-5">
                <div class="col-12 mb-5 text-center">
                    <h1 class="display-4">CONTACT</h1>
                    <p class="lead">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non earum libero et culpa inventore nemo sunt iure asperiores, beatae laudantium, maxime amet voluptatem iusto officiis, provident deleniti eaque voluptates doloremque.</p>
                </div>
                <div class="col-12">
                    <form v-on:submit.prevent="onSubmit">
                        <div class="form-row">
                            <div class="form-group col-12 col-md-6">
                                <label for="name">Name</label>
                                <input id="name" class="form-control" :class="{ 'is-invalid': $v.form.name.$error }" v-model.trim="$v.form.name.$model">
                                <div class="invalid-feedback" v-if="!$v.form.name.required">Field is required</div>
                                <div class="invalid-feedback" v-if="!$v.form.name.minLength">Name must have at least {{$v.form.name.$params.minLength.min}} letters</div>
                            </div>
                            <div class="form-group col-12 col-md-6">
                                <label for="email">Email</label>
                                <input id="email" :class="{ 'is-invalid': $v.form.email.$error }" v-model.trim="$v.form.email.$model" type="text" class="form-control">
                                <div class="invalid-feedback" v-if="!$v.form.email.required">Field is required</div>
                                <div class="invalid-feedback" v-if="!$v.form.email.email">Please enter a valid email address</div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="subject">Subject</label>
                            <input id="subject" :class="{ 'is-invalid': $v.form.subject.$error }" v-model.trim="$v.form.subject.$model" type="text" class="form-control">
                            <div class="invalid-feedback" v-if="!$v.form.subject.required">Field is required</div>
                        </div>
                        <div class="form-group">
                            <label for="question">Message</label>
                            <textarea id="question" type="text" rows="6" :class="{ 'is-invalid': $v.form.question.$error }" v-model.trim="$v.form.question.$model" class="form-control"/>
                            <div class="invalid-feedback" v-if="!$v.form.question.required">Field is required</div>
                        </div>
                        <div class="form-check">
                            <input type="checkbox" name="consent" id="consent" class="form-check-input" :class="{ 'is-invalid': $v.consent.$error }" v-model.trim="$v.consent.$model"/>
                            <label for="consent" class="form-check-label">Accept terms and conditions</label>
                        </div>
                        <button class="btn btn-dark mt-3">SUBMIT</button>
                    </form>
                </div>
            </div>
            <div v-if="messageSent" class="row py-5">
                <div class="col-12 mb-5 text-center">
                    <h1 class="display-4">Thank you for your inquiry!</h1>
                    <p class="lead">We will get back to you as soon as possible with a response. Take care {{message.message.name}}.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'

export default {
    data: function() {
        return {
            form: {
                name:"",
                subject:"",
                question:"",
                email:""
            },
            consent: false,
            messageSent: false
        }
    },
    computed: {
        ...mapState({
            message: state => state.message.all
        })
    },
    methods: {
        ...mapActions("message", ["addMessage"]),
        onSubmit: function() {
            this.$v.$touch()
            if (this.$v.$invalid) {
                return;
            } 
            else {
                this.addMessage(this.form);
                this.messageSent = true;
            }
        }
    },
    validations: {
        form: {
            name: { required, minLength: minLength(4) },
            email: { required, email },
            subject: { required },
            question: { required }
        },
        consent:  { sameAs: val => val === true }
    }
}
</script>

<style scoped>
.form-group, .form-check {
    text-transform: uppercase;
    letter-spacing: 0.2rem;
}
</style>
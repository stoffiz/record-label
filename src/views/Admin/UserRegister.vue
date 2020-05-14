<template>
    <div class="container">
        <div class="row py-5 d-flex justify-content-center">
            <div class="col-12 col-md-6">
                <h4 class="display-4 text-center mb-4">Register</h4>
                <form @submit.prevent="handleSubmit">
                    <div class="form-group">
                        <label for="firstname">First name</label>
                        <input type="text" v-model="user.firstname" name="firstname" class="form-control" :class="{ 'is-invalid': submitted && !user.firstname }" />
                        <div v-show="submitted && !user.firstname" class="invalid-feedback">First name is required</div>
                    </div>
                    <div class="form-group">
                        <label for="lastname">Last name</label>
                        <input type="text" v-model="user.lastname" name="lastname" class="form-control" :class="{ 'is-invalid': submitted && !user.lastname }" />
                        <div v-show="submitted && !user.lastname" class="invalid-feedback">Last name is required</div>
                    </div>
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" v-model="user.username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !user.username }" />
                        <div v-show="submitted && !user.username" class="invalid-feedback">Username is required</div>
                    </div>
                    <div class="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" v-model="user.password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !user.password }" />
                        <div v-show="submitted && !user.password" class="invalid-feedback">Password is required</div>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-dark" :disabled="status.loggingIn">Login</button>
                        <img v-show="status.loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            user: {
                firstname: '',
                lastname: '',
                username: '',
                password: '',
            },
            submitted: false
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    methods: {
        ...mapActions('account', ['register']),
        handleSubmit () {
            let item = this.user;
            console.log(this.user)
            this.submitted = true;
            this.register(this.user)
        }
    }
};
</script>
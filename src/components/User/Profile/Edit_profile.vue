<template>
<div>
    <template class="myMeetupTemplate">
        <v-btn text color="deep-purple accent-4" >
            Edit Profile
        </v-btn>

        <v-flex class=" col-sm-6 grey--text">
        <v-form @submit.prevent="onSignin" ref="form" lazy-validation class="formClass">
            <v-flex>
                <v-text-field
                    label="Full Name"
                ></v-text-field>
                <v-text-field
                    label="Email"
                ></v-text-field>
                <v-text-field
                    label="Phone Number"
                ></v-text-field>
                <v-text-field
                    label="Address"
                ></v-text-field>
            </v-flex>
            <v-btn type="submit" :disabled="formIsInvalid" class="blue">
                    Submit
            </v-btn>
        </v-form>
        </v-flex>
    </template>
</div>
</template>
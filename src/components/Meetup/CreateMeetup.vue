<template>
    <v-container>
    <v-form @submit.prevent="onCreateMeetup">
        <v-layout row>
            <v-flex class="col-xs-10 col-sm-6 offset-sm3 grey--text">
                <h2>
                    Create a New Meetup
                    <v-icon color="grey">
                        mdi-pencil
                    </v-icon>
                </h2>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex class="col-xs-12 col-sm-6 offset-sm3">
                <v-text-field v-model="title" name="title" label="Title" id="title" required>
                </v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex class="col-xs-12 col-sm-6 offset-sm3">
                <v-text-field v-model="location" name="location" label="Location" id="location" required>
                </v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex class="col-xs-12 col-sm-6 offset-sm3">
                <v-file-input
                    :rules="rules"
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Upload event image"
                    prepend-icon="mdi-camera"
                    label="Image"
                    id="image"
                    @change="onFilePicked"
                    v-model="image"
                ></v-file-input>
            </v-flex>
        </v-layout>
        <v-layout row v-if="imageUrl">
            <v-flex class="col-xs-12 col-sm-6 offset-sm3">
                <v-img :src="imageUrl" height="250"></v-img>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex class="col-xs-12 col-sm-6 offset-sm3">
                <v-textarea v-model="description" solo name="description" label="Description" id="description" >
                </v-textarea>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex class="col-xs-12 col-sm-6 offset-sm3">
                    <v-menu
                        :close-on-content-click="true"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="date" label="Meetup Date" prepend-icon="mdi-calendar"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                    </v-menu>
                    <v-dialog
                        ref="dialog"
                        v-model="modal2"
                        :return-value.sync="time"
                        persistent
                        width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                v-model="time"
                                label="Meetup Time"
                                prepend-icon="mdi-clock-outline"
                                readonly
                                v-on="on">
                            </v-text-field>
                        </template>
                        <v-time-picker
                        v-if="modal2"
                        v-model="time"
                        full-width
                        >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
                        </v-time-picker>
                    </v-dialog>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex class="col-xs-12 col-sm-6 offset-sm3">
                <v-btn :disabled="!formIsValid" tile type="submit">Create Meetup</v-btn>
            </v-flex>
        </v-layout>
    </v-form>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                title: '',
                location: '',
                imageUrl: '',
                description: '',
                date: new Date().toISOString().substr(0, 10),
                time: new Date().getHours() + ':' + new Date().getMinutes(),
                menu2: false,
                modal2: false,
                rules: [
                    value => !value || value.size < 2000000 || 'Image size should be less than 2 MB!',
                ],
                image: null,
            }
        },
        computed: {
            formIsValid () {
                return this.title !== '' &&
                 this.location !== '' && 
                 this.imageUrl !== '' && 
                 this.date !== '' && 
                 this.description !== '' &&
                 this.time !== ''
            },
            submittableDateTime () {
                const date = new Date(this.date)
                if (typeof this.time === 'string') {
                    const hours = this.time.match(/^(\d+)/)[1]
                    const minutes = this.time.match(/:(\d+)/)[1]
                    date.setHours(hours)
                    date.setMinutes(minutes)
                }
                return date
            }
        },
        methods: {
            onCreateMeetup () {
                if (!this.formIsValid) {
                    return
                }
                if (!this.image) {
                    return
                }
                const meetupData = {
                    title: this.title,
                    location: this.location,
                    image: this.image,
                    description: this.description,
                    date: this.submittableDateTime,
                }
                this.$store.dispatch('createMeetup', meetupData)
                this.$router.push('/meetups')
            },
            onFilePicked () {
                const image = this.image
                const fileReader = new FileReader
                fileReader.addEventListener('load', () => {
                    this.imageUrl = fileReader.result
                })
                fileReader.readAsDataURL(image)

                // console.log(image)
                // window.value 
                // const files = event.target.files
                // const fileReader = new FileReader()
                // fileReader.addEventListener('load', () => {
                //     this.imageUrl = fileReader.result
                // })
                // fileReader.readAsDataURL(files)
                // this.image = fileReader.result
            }
        }
    }
</script>
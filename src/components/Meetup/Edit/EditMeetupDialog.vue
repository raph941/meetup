<template>
    <v-dialog width="350px" persistent v-model="dialog">
        <template v-slot:activator="{ on }">
            <v-btn fab accent v-on="on">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-container>
                <v-layout row>
                    <v-flex class="col-xs-12">
                        <v-card-title>
                            Edit Meetup
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row>
                    <v-flex class="col-xs-12">
                        <v-card-text>
                            <v-text-field v-model="editedTitle" name="title" label="Title" id="title" required>
                            </v-text-field>
                        </v-card-text>
                        <v-card-text>
                            <v-textarea v-model="editedDescription" solo name="description" label="Description" id="description" >
                            </v-textarea>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row>
                    <v-flex class="col-xs-12">
                        <v-card-actions>
                            <v-btn text class="blue--text darken-1" @click="dialog = false">Close</v-btn>
                            <v-btn text class="blue--text darken-1" @click="onSaveChanges">Save</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['meetup'],
    data () {
        return {
            dialog: false,
            editedTitle: this.meetup.title,
            editedDescription: this.meetup.description,
        }
    },
    methods: {
        onSaveChanges () {
            if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
                return
            }
            this.dialog = false
            this.$store.dispatch('updateMeetupData', {
                id: this.meetup.id,
                title: this.editedTitle,
                description: this.editedDescription
            })
        }
    }
}
</script>
<template>
    <v-dialog width="350px" persistent v-model="dialog">
        <template v-slot:activator="{ on }">
            <v-btn text accent v-on="on" @click="showDatePicker = true">
                Edit Date
            </v-btn>
        </template>
        <v-card>
            <v-container>
                <v-layout row>
                    <v-flex class="col-xs-12">
                        <v-card-title>
                            Edit Date
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-layout row v-if="showDatePicker">
                    <v-card-text >
                        <v-date-picker v-model="datePicker"></v-date-picker>
                    </v-card-text>
                        
                    <v-flex class="col-xs-12">
                        <v-card-actions>
                            <v-btn text class="blue--text darken-1" @click="onClose">Close</v-btn>
                            <v-btn text class="blue--text darken-1" @click="onProceedToClock">Ok</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>

                <v-layout row v-if="showTimePicker">
                    <v-card-text >
                        <v-time-picker v-model="timePicker"></v-time-picker>
                    </v-card-text>
                        
                    <v-flex class="col-xs-12" >
                        <v-card-actions>
                            <v-btn text class="blue--text darken-1" @click="onClose">Close</v-btn>
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
             showTimePicker: false,
             showDatePicker: true,
             dialog: false,
             timePicker: new Date().getHours() + ':' + new Date().getMinutes(),
             datePicker: new Date().toISOString().substr(0, 10),
             editableDate: this.meetup.date,
         }
     },
     methods: {
        onSaveChanges () {
            const newDate = new  Date(this.meetup.date)
            console.log(newDate)
            const newDay = new Date(this.datePicker).getUTCDate()
            const newMonth = new Date(this.datePicker).getUTCMonth()
            const newYear = new Date(this.datePicker).getUTCFullYear()
            const newHours = this.timePicker.match(/^(\d+)/)[1]
            const newMinutes = this.timePicker.match(/:(\d+)/)[1]
            newDate.setUTCDate(newDay)
            newDate.setUTCMonth(newMonth)
            newDate.setUTCFullYear(newYear)
            newDate.setHours(newHours)
            newDate.setMinutes(newMinutes)
            this.$store.dispatch('updateMeetupData', {
                id: this.meetup.id,
                date: newDate
            })
        },
        onProceedToClock () {
            this.showDatePicker = false,
            this.showTimePicker = true
        },
        onClose () {
            this.dialog = false
            this.showTimePicker = false
        }
     },
     created () {
         this.editableDate = new Date(this.meetup.date)
     }
}
</script>
<template>
<div class="content">
     <v-list two-line>
      <v-list-item >
        <v-list-item-icon>
          <v-icon color="indigo">mdi-phone</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>(234) 816-056-1293</v-list-item-title>
          <v-list-item-subtitle>Mobile</v-list-item-subtitle>
        </v-list-item-content>

      </v-list-item>
      
      <v-divider inset></v-divider>

      <v-list-item >
        <v-list-item-icon>
          <v-icon color="indigo">mdi-email</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>raph941@gmail.com</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item >
        <v-list-item-icon>
          <v-icon color="indigo">mdi-map-marker</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>1400 Main Street</v-list-item-title>
          <v-list-item-subtitle>Orlando, FL 79938</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
</div>
</template>

<style scoped>
.content{
    padding:20px;
}
</style>
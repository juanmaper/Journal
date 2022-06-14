<template>
  <div class="entry-title d-flex justify-content-between p-2">

    <div>
      <span class="text-success fs-3 fw-bold">{{ day }}</span>
      <span class="mx-1 fs-3">{{ month }}</span>
      <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
    </div>

    <div>
      <input type="file" 
            @change="onSelectedImage"
            ref="imageSelector"
            v-show="false"
            accept="image/png, image/jpeg" >

      <button 
        v-if="entry.id"
        class="btn btn-danger mx-2"
        @click="onDeleteEntry">
          Delete
        <i class="fa fa-trash-alt"></i>
      </button>

      <button class="btn btn-primary" @click="onSelectImage">
        Upload photo
        <i class="fa fa-upload"></i>
      </button>
    </div>
  </div>

  <hr>
  <div class="d-flex flex-column px-3 h-75">
    <textarea 
      v-model="entry.text"
      placeholder="What happened today?">
    </textarea>
  </div>

  <Fab icon="fa-save" @on:click="saveEntry" />

  <img v-if="localImage"
       :src="localImage" 
       alt="Entry picture"
       class="img-thumbnail">
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'

import getDayMonthYear from "../helpers/getDayMonthYear"

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      entry: null,
      localImage: null,
      file: null
    }
  },

  components: {
    Fab: defineAsyncComponent( () => import('../components/Fab.vue'))
  },

  methods: {
    ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry']),
    loadEntry() {
      let entry 

      if ( this.id === 'new') {
        entry = {
          text: '',
          date: new Date().getTime()
        }
      } else {
          entry = this.getEntryById( this.id )
          if ( !entry ) return this.$router.push({ name: 'no-entry' })  
      }

      this.entry = entry
    },
    async saveEntry() {

      new Swal({
        title: 'Saving...',
        allowOutsideClick: false
      })

      Swal.showLoading()

      if ( this.entry.id ) {
        // Update entry
        await this.updateEntry(this.entry)
      } else {
        //Create entry
        const newEntryId = await this.createEntry( this.entry )
        this.$router.push({ name: 'entry', params: { id: newEntryId } })
      }

      Swal.fire('Saved', 'Entry registered successfully', 'success')
    },
    async onDeleteEntry() {

      const { isConfirmed } = await Swal.fire({
        title: 'Are you sure?',
        text: "You can't undo this action",
        showDenyButton: true,
        confirmButtonText: 'Yes, I am sure'
      })

      if ( !isConfirmed ) return

      new Swal({
        title: 'Deleting...',
        allowOutsideClick: false
      })

      Swal.showLoading()

      await this.deleteEntry( this.entry.id )
      this.$router.push({ name: 'no-entry'})

      Swal.fire('Deleted', '', 'success')
    },

    onSelectedImage( event ) {
      const file = event.target.files[0]

      if ( !file ) {
        this.localImage = null
        this.file = null
        return
      }

      this.file = file

      const fr = new FileReader()
      fr.onload = () => this.localImage = fr.result
      fr.readAsDataURL( file )

      console.log(this.localImage);
      console.log('-----------------------');
      console.log(this.file);
    },

    onSelectImage() {
      this.$refs.imageSelector.click()
    }
  },

  computed: {
    ...mapGetters('journal', ['getEntryById']),
    day() {
      const { day } = getDayMonthYear( this.entry.date )
      return day
    },
    month() {
      const { month } = getDayMonthYear( this.entry.date )
      return month
    },
    yearDay() {
      const { yearDay } = getDayMonthYear( this.entry.date )
      return yearDay
    }
  },

  created() {
    this.loadEntry()
  },

  watch: {
    id() {
      this.loadEntry()
    }
  }
}
</script>

<style lang="scss" scoped>

textarea {
  font-size: 20px;
  border: none;
  height: 100%;

  &:focus {
    outline: none;
  }
}

img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>
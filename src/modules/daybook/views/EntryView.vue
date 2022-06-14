<template>
  <div class="entry-title d-flex justify-content-between p-2">

    <div>
      <span class="text-success fs-3 fw-bold">{{ day }}</span>
      <span class="mx-1 fs-3">{{ month }}</span>
      <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
    </div>

    <div>
      <button 
        v-if="entry.id"
        class="btn btn-danger mx-2"
        @click="onDeleteEntry">
          Delete
        <i class="fa fa-trash-alt"></i>
      </button>

      <button class="btn btn-primary">
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

  <img src="https://www.collinsdictionary.com/images/full/flower_101359432.jpg" 
       alt="Entry picture"
       class="img-thumbnail">
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
import { mapActions, mapGetters } from 'vuex'
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
      entry: null
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

      if ( this.entry.id ) {
        // Update entry
        await this.updateEntry(this.entry)
      } else {
        //Create entry
        const newEntryId = await this.createEntry( this.entry )
        this.$router.push({ name: 'entry', params: { id: newEntryId } })
      }
    },
    async onDeleteEntry() {
      await this.deleteEntry( this.entry.id )
      this.$router.push({ name: 'no-entry'})
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
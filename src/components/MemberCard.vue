<template>
  <v-card
      class="ma-1"
      height="100%"
  >

    <!--Title-->
    <v-card-title>
      <v-avatar
          class="mr-3"
          size="56"
      >
        <img
            v-if="member.avatar_url"
            alt="avatar"
            :src="member.avatar_url"
        >
      </v-avatar>
      <div>
        <h4>{{ member.name }}</h4>
        <p class="text-caption mb-0 font-weight-light">
          {{ member.username }}
        </p>
      </div>
    </v-card-title>
    <v-divider></v-divider>

    <!--Groups-->
    <v-card-text>
      <v-list dense>
        <v-subheader class="px-0 text-uppercase">Groups</v-subheader>
        <v-list-item-group
            v-if="member.groups"
            color="primary"
        >
          <v-list-item
              v-for="group in member.groups"
              :key="group.id"
              class="mb-0"
          >
            <v-list-item-content>
              <v-list-item-title class="text-wrap d-flex justify-space-between">
                <span>{{ group.name }}</span>
                <v-chip
                    color="primary"
                    small
                    class="flex-shrink-0"
                >
                  {{ ACCESS_LEVEL[group.accessLevel]}}
                </v-chip>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <v-list-item v-else>No Groups</v-list-item>
      </v-list>

      <!--Projects-->
      <v-list dense>
        <v-subheader class="px-0 text-uppercase">Projects</v-subheader>
        <v-list-item-group
            v-if="member.projects"
            color="primary"
        >
          <template>
            <v-list-item
                v-for="project in member.projects"
                :key="project.id"
                class="mb-0"
            >
              <v-list-item-content>
                <v-list-item-title class="text-wrap d-flex justify-space-between align-center">
                  {{ project.name }}
                  <v-chip
                      color="primary"
                      small
                      class="flex-shrink-0"
                  >
                    {{ ACCESS_LEVEL[project.accessLevel] }}
                  </v-chip>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-item-group>
        <v-list-item v-else>No Projects</v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
const accessLevel = Object.freeze({
  5: 'Minimal',
  10: 'Guest',
  20: 'Reporter',
  30: 'Developer',
  40: 'Maintainer',
  50: 'Owner',
})

export default {
  name: 'MemberCard',

  props: {
    member: {
      type: Object,
      required: true
    }
  },

  created () {
    this.ACCESS_LEVEL = accessLevel;
  },
}
</script>

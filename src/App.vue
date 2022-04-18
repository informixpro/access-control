<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/gitlab-icon-1-color-white-rgb.svg"
          transition="scale-transition"
          width="60"
        />
        <v-toolbar-title>Access Control</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/informixpro/access-control.git"
        target="_blank"
        text
      >
        <span class="mr-2">Source</span>
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row class="mt-5">
          <v-col
              cols="12"
              md="4"
          >
            <v-form ref="form">
              <v-text-field
                  v-model="groupId"
                  :append-outer-icon="'mdi-magnify-plus'"
                  label="Group ID"
                  @click:append-outer="selectGroup(groupId)"
              ></v-text-field>
            </v-form>
          </v-col>
        </v-row>

        <template v-if="!error">
          <v-row>
            <v-col
                v-for="member in members"
                :key="member.id"
                cols="12"
                md="6"
                lg="4"
            >
              <member-card
                  :member="member"
                  :key="key"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h3 class="mt-4">Users: {{ members.length }}</h3>
            </v-col>
          </v-row>
        </template>
        <template v-else>Request error</template>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import api from './services/api/api.js'
import MemberCard from './components/MemberCard'

const GROUP_ID = '11164028'

export default {
  name: 'App',

  components: {
    MemberCard
  },

  data: () => ({
    groups: [],
    members: [],
    projects: [],
    groupId: GROUP_ID,
    key: 0,
    error: false
  }),

  mounted() {
    this.selectGroup(this.groupId)
  },

  methods: {
    selectGroup(groupId) {
      this.members = []
      this
        .getAllGroups(groupId)
        .then(() => {
          return Promise.all(this.groups.map(item => this.getGroupMembers(item.id)))
        })
        .then(() => {
          return Promise.all(this.groups.map(item => this.getGroupProjects(item.id)))
        })
        .then(() => {
          return Promise.all(this.projects.map(item => this.getProjectMembers(item.id)))
        })
        .then(() => this.forceUpdate())
    },

    getAllGroups(groupId) {
      return api.getAllGroups(groupId)
        .then( response => {
          this.groups = response.map(group => (
            {
              id: group.id,
              full_path: group.full_path
            }
          ))
        })
        .catch(error => {
          console.log(error)
          this.error = true
        });
    },

    getGroupMembers(groupId) {
      return api.getGroupMembers(groupId)
        .then( response => {
          if (response.length){
            response.map(member => {
              const existedMember = this.members.find(item => item.id === member.id)
              const group = this.groups.find(item => item.id === groupId)
              const groupObj = (group) => ({
                id: group.id,
                name: group.full_path,
                accessLevel: member.access_level
              })

              if (existedMember) {
                if (!existedMember.groups) existedMember.groups = []
                existedMember.groups.push(groupObj(group))
              } else {
                member.groups = [groupObj(group)]
                this.members.push(member)
              }
            })
          }        })
        .catch(error => {
          console.log(error)
          this.error = true
        });
    },

    getGroupProjects(groupId) {
      return api.getGroupProjects(groupId)
        .then( response => {
          response.map(project => {
            const existedProject = this.projects.find(item => item.id === project.id)
            if (!existedProject) this.projects.push(project)
          })
        })
        .catch(error => {
          console.log(error)
          this.error = true
        });
    },

    getProjectMembers(projectId) {
      return api.getProjectMembers(projectId)
        .then( response => {
          if (response.length) {
            response.map(member => {
              const existedMember = this.members.find(item => item.id === member.id)
              const project = this.projects.find(item => item.id === projectId)
              const projectObj = (project) => ({
                id: project.id,
                name: project.path_with_namespace,
                accessLevel: member.access_level
              })

              if (existedMember) {
                if (!existedMember.projects) existedMember.projects = []
                existedMember.projects.push(projectObj(project))
              } else {
                member.projects = [projectObj(project)]
                this.members.push(member)
              }
            })
          }
        })
        .catch(error => {
          console.log(error)
          this.error = true
        });
    },

    forceUpdate() {
      this.key++;
    },
  }
};
</script>

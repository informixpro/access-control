import axios from 'axios'

const BASE_URL = 'https://gitlab.com/api/v4/'
const TOKEN = 'naRAbrD8qPXaXVASQ8Zy'

const config = {
  headers: { Authorization: `Bearer ${TOKEN}` }
};

export default {
  getAllGroups(groupId) {
    return axios
		.get(BASE_URL + 'groups/' + groupId + '/descendant_groups', config)
		.then(response => response.data);
  },

  getGroupMembers(groupId) {
    return axios
		.get(BASE_URL + 'groups/' + groupId + '/members', config)
		.then(response => response.data);
  },

  getGroupProjects(groupId) {
    return axios
		.get(BASE_URL + 'groups/' + groupId + '/projects', config)
		.then(response => response.data);
  },

  getProjectMembers(projectId) {
    return axios
		.get(BASE_URL + 'projects/' + projectId + '/members', config)
		.then(response => response.data);
  },
}

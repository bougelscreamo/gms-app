import { f as defineStore, g as useAuth, h as useRuntimeConfig } from '../server.mjs';
import $axios from 'axios';
import Swal from 'sweetalert2';

const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: {
        name: "",
        email: "",
        jwt: "",
        role: 0,
        id: "",
        fullname: "",
        username: "",
        rolename: "",
        company: "",
        companyid: 0,
        companylogo: "",
        auth_token: "",
        ipaddress: ""
      }
    };
  },
  actions: {
    async setUser(payload) {
      const { signOut } = useAuth();
      this.user = payload;
      await $axios.get(`${useRuntimeConfig().public.API_BASE_URL}/users`, {
        headers: {
          "Authorization": `Bearer ${this.user.jwt}`,
          "Content-Type": "application/json"
        }
      }).then((res) => {
        this.user.fullname = res.data.data.fullname;
        this.user.role = res.data.data.role;
        this.user.company = res.data.data.company;
      }).catch((err) => {
        if (err.response.status == "403") {
          signOut();
        }
      });
    },
    logOutUser() {
    },
    async setUserData() {
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    }
  },
  persist: true
});
const useDataStore = defineStore("data", {
  state: () => {
    return {
      responseStatus: {},
      isCollapse: false,
      checkdevices: false,
      data: {
        alarms: [],
        chartPoll: false,
        clients: [],
        devices: [],
        dashboard: {
          chart: {
            daily: [],
            monthly: []
          },
          alarmhistory: []
        },
        monitoring: {
          realtime: {},
          tables: []
        },
        monitoring_min: {},
        parameters: [],
        plan: [],
        production: [],
        report: {
          room: [],
          chart: [],
          table: [],
          alarm: [],
          audit: []
        },
        searched: false,
        setting: [],
        stopPoll: false,
        users: [],
        updated: false,
        inserted: false,
        workorder: [],
        auditTrails: [],
        receipt: [],
        userProfile: {},
        settings: {}
      }
    };
  },
  actions: {
    async getParametersList() {
      const auth = useAuthStore();
      let response = await $axios.get(
        `${useRuntimeConfig().public.API_BASE_URL}/api/parameters/list`,
        {
          headers: {
            Authorization: `Bearer ${auth.getUser.jwt}`,
            "Content-Type": "application/json"
          }
        }
      );
      this.$state.data.parameters = response.data;
    },
    async updateParameter(payload) {
      const auth = useAuthStore();
      return await $axios.put(
        `${useRuntimeConfig().public.API_BASE_URL}/api/parameters`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${auth.getUser.jwt}`,
            "Content-Type": "application/json"
          }
        }
      );
    },
    async getUserList() {
      const auth = useAuthStore();
      await $axios.get(`${useRuntimeConfig().public.API_BASE_URL}/users/list`, {
        headers: {
          Authorization: `Bearer ${auth.getUser.jwt}`,
          "Content-Type": "application/json"
        }
      }).then((res) => {
        this.$state.data.users = res.data;
      }).catch((err) => {
        console.log(err);
      });
    },
    async createUser(payload) {
      const auth = useAuthStore();
      return await $axios.post(
        `${useRuntimeConfig().public.API_BASE_URL}/users/add`,
        {
          fullname: payload.fullname,
          username: payload.username,
          role: payload.role,
          password: payload.password
        },
        {
          headers: {
            Authorization: `Bearer ${auth.getUser.jwt}`,
            "Content-Type": "application/json"
          }
        }
      );
    },
    async updateUser(payload) {
      const auth = useAuthStore();
      return await $axios.put(
        `${useRuntimeConfig().public.API_BASE_URL}/users/edit/${payload.userid}`,
        {
          fullname: payload.fullname,
          username: payload.username,
          role: payload.role,
          password: payload.password,
          status: payload.status
        },
        {
          headers: {
            Authorization: `Bearer ${auth.getUser.jwt}`,
            "Content-Type": "application/json"
          }
        }
      );
    },
    async deleteUser(payload) {
      const auth = useAuthStore();
      return await $axios.delete(
        `${useRuntimeConfig().public.API_BASE_URL}/users/${payload}`,
        {
          headers: {
            Authorization: `Bearer ${auth.getUser.jwt}`,
            "Content-Type": "application/json"
          }
        }
      );
    },
    async getDeviceList() {
      const auth = useAuthStore();
      let response = await $axios.get(
        `${useRuntimeConfig().public.API_BASE_URL}/api/devices/list`,
        {
          headers: {
            Authorization: `Bearer ${auth.getUser.jwt}`,
            "Content-Type": "application/json"
          }
        }
      );
      this.$state.data.devices = response.data;
    },
    async updateDevice(payload) {
      const auth = useAuthStore();
      return await $axios.put(
        `${useRuntimeConfig().public.API_BASE_URL}/api/devices`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${auth.getUser.jwt}`,
            "Content-Type": "application/json"
          }
        }
      );
    },
    async checkDevice() {
      useAuthStore();
      await $axios.get("public/client.json").then((res) => {
        this.checkdevices = true;
        let userClient = {
          username: res.data.username,
          password: res.data.password
        };
        this.$state.data.users.push(userClient);
      });
    },
    // async getDevice(payload) {
    //   try {
    //     const auth = useAuthStore();
    //     await $axios
    //       .post(`${useRuntimeConfig().public.API_BASE_URL}/api/devices`, {
    //         client: payload.client,
    //       })
    //       .then((ress) => {
    //         auth.$state.user.role = 4;
    //         auth.$state.user.rolename = "operator";
    //         auth.$state.user.id = "Operator";
    //         auth.$state.user.companyid = ress.data.data[0].id;
    //         auth.$state.user.fullname = "Operator";
    //       });
    //   } catch (err) {
    //     console.error(err);
    //   }
    // },
    async getDailyChart() {
      const auth = useAuthStore();
      try {
        let response = await $axios.get(
          `${useRuntimeConfig().public.API_BASE_URL}/api/dashboard/chart/daily`,
          {
            headers: {
              Authorization: `Bearer ${auth.getUser.jwt}`,
              "Content-Type": "application/json"
            }
          }
        );
        this.$state.data.dashboard.chart.daily = response.data;
      } catch (error) {
        alert(error);
        console.log("error getDailyChart");
      }
    },
    async getReport(payload) {
      const auth = useAuthStore();
      await $axios.post(
        `${useRuntimeConfig().public.API_BASE_URL}/api/reports`,
        {
          roomid: payload.roomid,
          parameter: payload.parameter,
          start: payload.start,
          end: payload.end,
          alarm: payload.alarm,
          auditrail: payload.auditrail,
          reporttable: payload.reporttable
        },
        {
          headers: {
            Authorization: `Bearer ${auth.getUser.jwt}`,
            "Content-Type": "application/json"
          }
        }
      ).then((ress) => {
        this.$state.data.report.chart = ress.data.data.chart;
        this.$state.data.report.table = ress.data.data.table;
        this.$state.data.report.alarm = ress.data.data.alarm;
        this.$state.data.report.audit = ress.data.data.audit;
        Swal.fire({
          title: "Success!",
          text: "Report create Success",
          icon: "Success"
        });
      }).catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Error Create Report " + err,
          icon: "error"
        });
      });
    },
    async getReportRoom(payload) {
      const auth = useAuthStore();
      let response = await $axios.get(
        `${useRuntimeConfig().public.API_BASE_URL}/api/reports/room/${payload}`,
        {
          headers: {
            Authorization: `Bearer ${auth.getUser.jwt}`,
            "Content-Type": "application/json"
          }
        }
      );
      this.$state.data.report.room = response.data.data;
    },
    async postAuditTrail(payload) {
      const auth = useAuthStore();
      await $axios.post(
        `${useRuntimeConfig().public.API_BASE_URL}/api/audittrail`,
        {
          access: payload.access,
          action: payload.action,
          description: payload.description
        },
        {
          headers: {
            Authorization: `Bearer ${auth.getUser.jwt}`,
            "Content-Type": "application/json"
          }
        }
      ).catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Error while insert audit trails",
          icon: "error"
        });
      });
    },
    async getAuditTrail() {
      const auth = useAuthStore();
      await $axios.get(`${useRuntimeConfig().public.API_BASE_URL}/api/audittrail`, {
        headers: {
          Authorization: `Bearer ${auth.getUser.jwt}`,
          "Content-Type": "application/json"
        }
      }).then((res) => {
        this.$state.data.auditTrails = res.data;
      }).catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Error while get audit trails",
          icon: "error"
        });
      });
    },
    async getAlarmHistory() {
      const auth = useAuthStore();
      await $axios.get(`${useRuntimeConfig().public.API_BASE_URL}/api/alarms`, {
        headers: {
          Authorization: `Bearer ${auth.getUser.jwt}`,
          "Content-Type": "application/json"
        }
      }).then((res) => {
        this.$state.data.alarms = res.data;
      }).catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Error while get alarm history",
          icon: "error"
        });
      });
    },
    async getMonitoring() {
      const auth = useAuthStore();
      await $axios.get(`${useRuntimeConfig().public.API_BASE_URL}/api/mon`, {
        headers: {
          Authorization: `Bearer ${auth.getUser.jwt}`,
          "Content-Type": "application/json"
        }
        // timeout : 1000
      }).then((res) => {
        if (res.data) {
          this.$state.data.monitoring = res.data;
        }
      }).catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Error while get monitoring",
          icon: "error"
        });
      });
    },
    async getMonitoringMin(payload) {
      const auth = useAuthStore();
      await $axios.get(`${useRuntimeConfig().public.API_BASE_URL}/api/mon/minutes/${payload.Type}/${payload.id}`, {
        headers: {
          Authorization: `Bearer ${auth.getUser.jwt}`,
          "Content-Type": "application/json"
        }
      }).then((res) => {
        this.$state.data.monitoring_min = res.data;
      }).catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Error while get monitoring",
          icon: "error"
        });
      });
    },
    async getReceipt() {
      const auth = useAuthStore();
      await $axios.get(`${useRuntimeConfig().public.API_BASE_URL}/api/receipt/list`, {
        headers: {
          Authorization: `Bearer ${auth.getUser.jwt}`,
          "Content-Type": "application/json"
        }
      }).then((res) => {
        this.$state.data.receipt = res.data;
      }).catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Error while get receipt : " + err,
          icon: "error"
        });
      });
    },
    async postReceipt(payload) {
      const auth = useAuthStore();
      return await $axios.post(
        `${useRuntimeConfig().public.API_BASE_URL}/api/receipt`,
        {
          notification_type: payload.notification_type,
          receipt: payload.receipt,
          receiptname: payload.receiptname,
          active: payload.active
        },
        {
          headers: {
            Authorization: `Bearer ${auth.getUser.jwt}`,
            "Content-Type": "application/json"
          }
        }
      );
    },
    async updateReceipt(payload) {
      const auth = useAuthStore();
      return await $axios.put(
        `${useRuntimeConfig().public.API_BASE_URL}/api/receipt`,
        {
          notification_type: payload.notification_type,
          receipt: payload.receipt,
          receiptname: payload.receiptname,
          active: payload.active,
          idreceipt: payload.idreceipt
        },
        {
          headers: {
            Authorization: `Bearer ${auth.getUser.jwt}`,
            "Content-Type": "application/json"
          }
        }
      );
    },
    async deleteReceipt(payload) {
      const auth = useAuthStore();
      return await $axios.delete(
        `${useRuntimeConfig().public.API_BASE_URL}/api/receipt/${payload}`,
        {
          headers: {
            Authorization: `Bearer ${auth.getUser.jwt}`,
            "Content-Type": "application/json"
          }
        }
      );
    },
    async deleteAlarm(payload) {
      const auth = useAuthStore();
      return await $axios.delete(
        `${useRuntimeConfig().public.API_BASE_URL}/api/alarms/${payload}`,
        {
          headers: {
            Authorization: `Bearer ${auth.getUser.jwt}`,
            "Content-Type": "application/json"
          }
        }
      );
    },
    async editSettings(payload) {
      const auth = useAuthStore();
      await $axios.put(
        `${useRuntimeConfig().public.API_BASE_URL}/api/settings`,
        {
          system_name: payload.system_name,
          supervisor_name: payload.supervisor_name,
          supervisor_signature: payload.supervisor_signature,
          supervisor_comment: payload.supervisor_comment,
          smpt_server: payload.smpt_server,
          smpt_port: payload.smpt_port,
          auto_generate_report: payload.auto_generate_report,
          location: payload.location
        },
        {
          headers: {
            Authorization: `Bearer ${auth.getUser.jwt}`,
            "Content-Type": "application/json"
          }
        }
      ).then((res) => {
        Swal.fire({
          title: "Success!",
          text: "Setting Update Success ",
          icon: "Success"
        });
      }).catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Error Update Setting " + err,
          icon: "error"
        });
      });
    },
    async getUserProfile() {
      const auth = useAuthStore();
      await $axios.get(`${useRuntimeConfig().public.API_BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${auth.getUser.jwt}`,
          "Content-Type": "application/json"
        }
      }).then((res) => {
        this.$state.data.userProfile = res.data;
      }).catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Error while get user profile : " + err,
          icon: "error"
        });
      });
    },
    async changePassword(currentPassword, newPassword, idUser) {
      const auth = useAuthStore();
      return await $axios.put(
        `${useRuntimeConfig().public.API_BASE_URL}/users`,
        {
          new_password: newPassword,
          current_password: currentPassword,
          id: idUser
        },
        {
          headers: {
            Authorization: `Bearer ${auth.getUser.jwt}`,
            "Content-Type": "application/json"
          }
        }
      );
    },
    async getSettings() {
      const auth = useAuthStore();
      await $axios.get(`${useRuntimeConfig().public.API_BASE_URL}/api/settings`, {
        headers: {
          Authorization: `Bearer ${auth.getUser.jwt}`,
          "Content-Type": "application/json"
        }
      }).then((res) => {
        this.$state.data.settings = res.data;
      }).catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Error while get user profile : " + err,
          icon: "error"
        });
      });
    }
  }
});

export { useAuthStore as a, useDataStore as u };
//# sourceMappingURL=data-25a661d5.mjs.map

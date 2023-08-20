import CredentialsProvider from 'next-auth/providers/credentials';
import $axios from 'axios';
import { N as NuxtAuthHandler, u as useRuntimeConfig } from './nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'h3';
import 'ofetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'klona';
import 'defu';
import 'ohash';
import 'ufo';
import 'unstorage';
import 'radix3';
import 'next-auth/core';
import 'next-auth/jwt';
import 'requrl';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'http-graceful-shutdown';

const _____ = NuxtAuthHandler({
  secret: "your-secret-here",
  pages: {
    signIn: "/login",
    error: "/login"
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      debugger;
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.jwt = user ? user.access_token || "" : "";
        token.id = user ? user.id || "" : "";
        token.role = user ? user.role || "" : "";
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      debugger;
      session.role = token.role;
      session.uid = token.id;
      return Promise.resolve(session);
    }
  },
  providers: [
    CredentialsProvider.default({
      name: "Credentials",
      async authorize(credentials) {
        const res = await fetch(
          `${useRuntimeConfig().public.API_BASE_URL}/auth`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          }
        );
        if (res.ok) {
          const user = await res.json();
          const response = await $axios.get(
            `${useRuntimeConfig().public.API_BASE_URL}/users`,
            {
              headers: {
                Authorization: `Bearer ${user.data}`,
                "Content-Type": "application/json"
              }
            }
          );
          const u = {
            id: credentials.username,
            email: "",
            name: response.data.data.fullname,
            access_token: user.data,
            role: response.data.data.role
          };
          return u;
        } else {
          return null;
        }
      }
    }),
    CredentialsProvider.default({
      id: "ClientDevice",
      name: "ClientDevice",
      async authorize(credentials) {
        const res = await fetch(
          `${useRuntimeConfig().public.API_BASE_URL}/api/devices`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          }
        );
        if (res.ok) {
          const u = {
            id: "Operator",
            email: "Operator",
            name: "Operator",
            access_token: credentials.client,
            role: 4
          };
          return u;
        } else {
          return null;
        }
      }
    })
  ]
});

export { _____ as default };
//# sourceMappingURL=_..._.mjs.map

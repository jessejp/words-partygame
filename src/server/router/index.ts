// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import generateLobbyID from "../../utils/generateLobbyID";
import { z } from "zod";

const lobbies: string[] = [];

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .mutation("createSession", {
    input: z.string(),
    resolve({ input }) {
      lobbies.push(input);
      return input;
    },
  })
  .query("getSession", {
    input: z.object({
      session: z.string(),
    }),
    resolve({ input }) {
      if (lobbies.find((lobby) => lobby === input.session)) {
        return true;
      } else {
        return false;
      }
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;

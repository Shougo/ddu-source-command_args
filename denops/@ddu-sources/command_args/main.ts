import {
  ActionFlags,
  type Actions,
  type DduItem,
  type Item,
} from "@shougo/ddu-vim/types";
import { BaseSource } from "@shougo/ddu-vim/source";

import type { Denops } from "@denops/std";

type Params = {
  command: string;
  args: string[];
};

type ActionData = {
  arg: string;
};

export class Source extends BaseSource<Params> {
  override gather(args: {
    denops: Denops;
    sourceParams: Params;
  }): ReadableStream<Item<ActionData>[]> {
    return new ReadableStream({
      start(controller) {
        controller.enqueue(args.sourceParams.args.map((arg) => ({
          word: arg,
          action: {
            arg,
          },
        })));

        controller.close();
      },
    });
  }

  override actions: Actions<Params> = {
    execute: {
      description: "Execute the command with args.",
      callback: async (args: {
        denops: Denops;
        items: DduItem[];
        sourceParams: Params;
      }) => {
        for (const item of args.items) {
          const action = item.action as ActionData;
          await args.denops.cmd(`${args.sourceParams.command} ${action.arg}`);
        }
        return Promise.resolve(ActionFlags.None);
      },
    },
  };

  override params(): Params {
    return {
      command: "",
      args: [],
    };
  }
}

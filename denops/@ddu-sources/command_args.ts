import {
  ActionFlags,
  Actions,
  BaseSource,
  DduItem,
  Item,
} from "https://deno.land/x/ddu_vim@v4.1.0/types.ts";
import { Denops } from "https://deno.land/x/ddu_vim@v4.1.0/deps.ts";

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
    execute: async (args: {
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
  };

  override params(): Params {
    return {
      command: "",
      args: [],
    };
  }
}

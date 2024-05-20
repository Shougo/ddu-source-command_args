import { Actions, ActionFlags, BaseSource, DduItem, Item } from "https://deno.land/x/ddu_vim@v4.1.0/types.ts";
import { Denops } from "https://deno.land/x/ddu_vim@v4.1.0/deps.ts";

type Params = Record<string, never>;

export class Source extends BaseSource<Params> {
  override gather(args: {
    denops: Denops;
    sourceParams: Params;
  }): ReadableStream<Item<Params>[]> {
    return new ReadableStream({
      async start(controller) {
        controller.close();
      },
    });
  }

  override actions: Actions<Params> = {
    do: async (args: {
      denops: Denops;
      items: DduItem[];
      kindParams: Params;
      actionParams: unknown;
    }) => {
      return Promise.resolve(ActionFlags.None);
    },
  };
  override params(): Params {
    return {};
  }
}

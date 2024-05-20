# ddu-source-command_args

Command arguments source for ddu.vim

This source collects args for specific command.

## Required

### denops.vim

https://github.com/vim-denops/denops.vim

### ddu.vim

https://github.com/Shougo/ddu.vim

## Configuration

```vim
call ddu#custom#patch_global(#{
    \   sourceOptions: #{
    \     command_args: #{
    \       defaultAction: 'execute',
    \     },
    \   },
    \ })
call ddu#start(#{ sources: [#{ name: 'command_args' }] })
```

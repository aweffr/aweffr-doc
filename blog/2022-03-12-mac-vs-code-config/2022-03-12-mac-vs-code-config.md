---
slug: mac-vs-code-config
title: Mac环境打造简单C/C++开发环境
authors: [ aweffr ]
tags: ["C/C++", "mac", "VS Code"]
---

## Motiviation
有人说要从零开始学计算机, 考虑到CS61A/B/C路线对英文和找资料有比较高的要求, 遂为其转进国内优秀课程路线. 为了能够使用上配套的OJ, 先帮忙搞定一下C语言mac开发环境. 

毕竟, 想成为一名好程序员, 编程这门手艺活还是得6啊. 

## 总体步骤
1. 安装XCode
2. VS Code 安装 C/C++ Extension Pack 插件
3. 新建项目 
  1. `mkdir learning-c-programming && cd learning-c-programming && mkdir {.vscode,build}`
4. 使用VS Code打开目录, 新建以下文件
  1. tasks.json # 用于编译c++文件
  2. launch.json # 用于使用vscode自带的debug工具（左侧的小虫图标）
  3. c_cpp_properties.json # 用于使用vscode自带的代码提示工具如 IntelliSense

### Workspace 配置文件

#### 配置 tasks.json

快捷键 `Command + Shift + B`, vscode会执行tasks.json中的任务.


文件内容如下:
```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "C/C++: clang++ 生成活动文件",
            "type": "shell",
            "command": "clang",
            "args": [
                "-Wall",
                "-Wno-unused-variable",
                "-std=c11",
                "-g",
                "${file}",
                "-o",
                "${workspaceFolder}/build/${fileBasenameNoExtension}"
            ],
            "options": {
                "cwd": "${workspaceFolder}"
            },
            "problemMatcher": [
                "$gcc"
            ],
            "group": "build"
        }
    ]
}
```

#### 配置 c_cpp_properties.json
c_cpp_properties.json 的作用是：代码提示、代码跳转等

```json
{
    "configurations": [
        {
            "name": "Mac",
            "includePath": [
                "${workspaceFolder}/**",
                "/Library/Developer/CommandLineTools/usr/include",
                "/Library/Developer/CommandLineTools/usr/lib/clang/12.0.5/include",
                "/usr/local/include"
            ],
            "defines": [],
            "macFrameworkPath": [
                "/System/Library/Frameworks",
                "/Library/Frameworks"
            ],
            "compilerPath": "/usr/bin/clang++",
            "cStandard": "c11",
            "cppStandard": "c++17",
            "intelliSenseMode": "clang-x64"
        }
    ],
    "version": 4
}
```

#### 配置 launch.json

launch.json是调用vscode debug功能的配置文件

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "clang++ - 生成和调试活动文件",
            "type": "cppdbg",
            "request": "launch",
            "program": "${workspaceFolder}/build/${fileBasenameNoExtension}",
            "args": [
                "args", "can", "be", "there"
            ],
            "stopAtEntry": false,
            "cwd": "${workspaceFolder}/build",
            "environment": [],
            "externalConsole": false,
            "MIMode": "lldb",
            "preLaunchTask": "C/C++: clang++ 生成活动文件"
        }
    ]
}
```

## 使用说明
- 针对OJ, 所以认为单个c文件即为完整程序。
- 在打开的`foo.c`文件tab中通过`Command + Shift + B`编译文件, 产物会生成在`build/foo`, 可通过 `cd build && ./foo`来运行.
- 处理标准输入流建议使用fscanf, 做一个环境开关(可见最后的样例[代码](#c程序示例-处理输入)), 相关知识可见
  - [StackOverflow: fscanf STDIN](https://stackoverflow.com/a/39051511)
  - [CMU 15-123 C Strings and File IO](./Lecture-02-C-Strings-File-IO-C-primer.pdf)
- 本文写作时还看到了挺不错的复习参考, 初学者请先跳过
  - [CMU 15-123 N09 Lec03](./Lecture-03-Arrays-and-Pointers.pdf)
  - [CMU 15-123 S11 Lec04](./Lecture-04-c-pointer-intro.pdf)
  - [CMU 15-123 S11 Lec05](./Lecture-05-c-pointer-contiune.pdf)


## c程序示例 处理输入

```c
/**
 * @file bubble-sort.c
 * @author aweffr (aweffr@foxmail.com)
 * @brief 提交OJ模板, 用于演示: 1. 读数组数据 2. 如何按环境区分输入源
 * @version 0.1
 * @date 2022-03-12
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_INPUT_SIZE 50000

#define __DEV__ 1
#define __DEV_FILE__ "/Users/aweffr/Developer/learning-c-programming/problem-set1/input.txt"

void swap(int *arr, int i, int j);

/**
 * @brief 根据 __DEV__ 决定是从编写的测试input文件还是OJ的stdin读取输入
 *
 * @return FILE*
 */
FILE *get_input()
{
  FILE *fptr = stdin;
  if (__DEV__)
  {
    fptr = fopen(__DEV_FILE__, "r");
    if (fptr == NULL)
    {
      printf("Open File Error!");
      exit(1);
    }
  }
  return fptr;
}

int main(int argc, char *argv[])
{
  FILE *fptr = get_input();

  int N = 0;

  fscanf(fptr, "%d\n", &N);

  int input_arr[MAX_INPUT_SIZE];
  memset(input_arr, 0, MAX_INPUT_SIZE);

  for (int i = 0; i < N; i++)
  {
    fscanf(fptr, "%d\n", &input_arr[i]);
  }

  for (int i = 0; i < N; i++)
  {
    for (int j = 0; j < N - 1; j++)
    {
      if (input_arr[j] > input_arr[j + 1])
      {
        swap(input_arr, j, j + 1);
      }
    }
  }

  printf("sorted result: ");
  for (int i = 0; i < N; i++)
  {
    char *fmt = (i == 0) ? " %d" : ", %d";
    printf(fmt, input_arr[i]);
  }
  printf("\n");

  return 0;
}

void swap(int *arr, int i, int j)
{
  int tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

```



## 参考文档
1. [segmentfault: mac vscode c++ 环境配置及异常的语法提示](https://segmentfault.com/a/1190000039129854)
2. [VS Code 官方文档: Using Clang in Visual Studio Code](https://code.visualstudio.com/docs/cpp/config-clang-mac#_prerequisites)
3. [VS Code变量参考手册](https://code.visualstudio.com/docs/editor/variables-reference)
4. [Clang 命令行手册](https://clang.llvm.org/docs/UsersManual.html#command-line-options)
5. [CMU 15-123 C & Unix S11](https://www.cs.cmu.edu/~guna/15-123S11/)
6. [CMU 15-123 C & Unix N09](https://www.cs.cmu.edu/~ab/15-123N09/lectures/)

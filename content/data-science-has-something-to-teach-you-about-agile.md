---
title: Data Science Has Something to Teach You About Agile
tags:
  - tag: Coding
    icon: code-braces
  - tag: Data Science
    icon: chart-bubble
  - tag: Humans
    icon: account
  - tag: Management
    icon: account-multiple
date: 2019-02-12T10:00:00+01:00
thumbnail: uploads/law-of-large-numbers-dice.png
summary: Did you know that a mathematical theorem can tell you when Agile ways of working will work or not ? Knowing this can help you avoid common pitfalls.
---

### Agile is not about delivering at all cost

Last week, I was discussing with a young colleague about her first weeks working with us. She was stressed because she was struggling to handle a risky situation. She committed to deliver a software in less than a week, using a tool she didn't know. She was fearing that the task may be longer than what she expected. As if it was common for us to do so, she asked me the permission to work on the weekend, with a smile: "That's Agile, we gotta deliver !".

God, no.

On the contrary, the purpose of _Agile_ ways of working is to avoid this kind of perilous situation. Agility is not an excuse to force people to work on their leisure time. It's, in fact, designed to avoid that.

So what's wrong with this situation ? Let's explain a bit.

### Knowledge Workers Have The Most Risky Jobs in The World

Knowledge workers have the most risky jobs in the world. Obviously, they don't risk _their life_ at work. What I mean by _risky_ is in fact _uncertain_. Statisticians use this word to mean "_we don't for sure know the outcome of this_".

That's because the job of a knowledge worker is to produce information using other informations. And information, in itself, is _experiential_: the first step of every task for a knowledge worker is to analyze the information he/she has. You don't know the quality of information before you have it in hand. In other words, you have to _experience_ information to know its value.

As a result, every information-based task is a little adventure. While performing it, you often discover a different context from what you expected.

### The Uncertainty in The Daily Life of a Medical Doctor

Let's take a well-know example: Medical doctors. Medicine is one of the first knowledge-based jobs invented by humanity.

A medical doctor is a knowledge worker. First, he gathers information about your body condition, by doing an auscultation and some medical exams. Then he reminds himself his knowledge relevant to the symptoms he sees and what he can deduce from that. This second step is mostly an internal cognitive process, so you don't see it happen _live_, as for the auscultation, but it is nonetheless crucial.

Then he produces some new information, if possible, which are the diagnosis of what is the patient condition and what is the cure corresponding to the patient condition, if available.

As the most frequent diseases are well known, this process is usually pretty efficient. But if your condition is unfrequent or new, the result of this process is highly uncertain: your MD may not be able to treat you. As a result, you can recall all your auscultations, medical doctors don't commit to anything: they just tell you "Let's see what I can do".

Now, let's say your medical doctor tells you "Sure, I'm able to cure your condition", before having done a proper diagnosis. Would you be reassured about his competencies ? I guess not. In other words, this is a way to distinguish a charlatan from a real health care professional: a charlatan claims he can cure you _before_ studying your condition, a healthcare professional will tell you if he can cure you _after_ studying your condition.

|        ![When Ripley sees the alien in his belly](https://cdn3-www.comingsoon.net/assets/styd/assets/uploads/2015/12/Alien7.jpg)        |
|:---------------------------------------------------------------------------------------------------------------------------------------:|
| _In alien 3, when Ripley's scans herself and finds she has an alien in her belly, you get a taste of the risk of medical diagnosis._ 😄 |

On the contrary, emergency rooms in hospitals are a pretty strong commitment to society and are somewhat certain, statistically speaking. The commitment is _"With 3 medical doctors, we can handle 99% of the patients we receive during the night"_.

How come medical doctors can commit to some results in certain situation and not in other situations ? The answer is: _statistics_. MDs cannot commit to **one** diagnosis, but can commit to **many**.

That's the same for all other knowledge workers: an individual cannot commit to the outcome of single task, a group of workers can commit to a certain level of performance for a group of tasks.

### Software Engineers & Data Scientists Are Also Knowledge Workers

Software engineers & data scientists writing software and data pipelines are like MDs, they cannot predict the amount of time a task will be, **before having started it** (or _experienced_ it).

And they encounter new tasks much more often than MDs ! Mainly because of the job of IT professionals is to automate recurring tasks. For problems that they encounter often, software engineers & data scientists create _functions_: a service which will be able to reproduce a solution to a known problem repeatedly. IT development tasks are almost exclusively to **create new functions**, because as soon as you are reproducing a task over and over, every developer will try to automate it.

This process of creating a new function is highly uncertain:

- You don't know very well what will be the input data, you have to make assumptions.
- You don't know perfectly if the tool you are using is able to solve the problem you want to solve.
- You don't know perfectly if your solution will solve properly the problem.

To put it in another way, **IT development is like playing dice**. There are 2 things that can render IT projects more predictable:

First, **use statistics**. Commit to a set of task rather than a single task. Make a statistical mean of all those dice rolls.

Then, **reduce the uncertainty of each task**. I will show you 2 Agile best practices which can help you about that in the following of the article.

### Use Statistics: The Law of Large Numbers

All statisticians (and data scientists, hopefully) know the law of large numbers:

> The average of the results obtained from a large number of trials should be close to the expected value, and will tend to become closer as more trials are performed. [from the wikipedia page of the [Law of large numbers](https://en.wikipedia.org/wiki/Law_of_large_numbers)]

That's the explanation of why the MDs cannot commit to curing you with certainty, but a group of MDs can commit to curing a group of patients, up to a certain (average) performance level.

The law of large numbers tells us that the more dice you roll, the more certain you are about the average of all those dice rolls. A simulation of the law of large numbers is available [here on wolfram alpha](https://demonstrations.wolfram.com/LawOfLargeNumbersDiceRollingExample/).

|             ![Law of large numbers](https://upload.wikimedia.org/wikipedia/commons/c/c9/Lawoflargenumbers.svg)             |
|:--------------------------------------------------------------------------------------------------------------------------:|
| An illustration of the law of large numbers from [wikipedia's article](https://en.wikipedia.org/wiki/Law_of_large_numbers) |

And the effect is more striking when plotting several simulations.

| <img src="uploads/law-of-large-numbers-dice.png" width=576 height=384> |
|:-----------------------------------------------------------------------:|
|                Home-made simulations (15 different runs)                |

Let's take an example: You have 2 tasks to do, you estimate the workload to 3.5 days each, based on complexity of similar tasks. Your estimated workload is 7 days for the sprint

But each task duration, in reality, is a roll of dice: it could be 1 day if everything goes well or it could be 6 days if you encounter issues (e.g: bugs).

If you roll 2 dices, you will often end up with a higher number than 7. You fail to deliver what you promised. You will often end up also with a lower number than 7, which means that you deliver faster than expected. But unfortunately, every client has a tendency to remember when you failed more than when you overdelivered. That's another cognitive bias. 😅

On the other hand, if you have 100 tasks to do, with workload estimations of 3.5 days for each, your estimated workload is 350 days for the sprint. If you roll 100 dices, you will end up with something really close to 350 days. You deliver what you promised.

### Reduce the uncertainty of each task:

IT tasks assessment is inherently uncertain because most of the time we don't know how difficult is our target. In fact, most of the time, we underestimate the difficulty.

> **Developers do what they do**, not because they believe that it is feasible, but **because they think it will be easy**.

For example, to assess the effort needed to build a (fairly simple) house, you count the number of bricks you have, the number of arms you have and the time needed to cement a brick on a wall with your arms. With that information, you are able to guess the time needed to build the house. Putting a brick on a wall is a repeatable and well-known task. No hazard here.

On the other hand, to assess the effort needed to build a new software, you throw a dice for every task. Because it's uncertain. But the worst part is, you don't know what is the size of the dice you are rolling: is it a 6-faced ? a 12-faced ?

To reduce the uncertainty of each task assessment, agile developers have come up with 2 best practices:

First, **do small chunks**. We split tasks in subtasks until we can imagine the course of events needed to realize the task. It's because it's easier to assess a small task than a big one. That's also a way to benefit from the _law of large numbers_: better rolling many small dices than a big one.

Then, **use collective intelligence**, as for example with [planning poker](https://en.wikipedia.org/wiki/Planning_poker). The poker thing is important to avoid the first one to talk to influence the others during the assessment (due to the _anchor_ cognitive bias, but that's a topic for another article).

### Three Rules to Help Your Team

In the end, here are some simple tips you can follow:

> The 3 golden rules for robust planning:
>
> - Split: Every task should be less than 2 days in estimated workload, otherwise split it into subtasks.
> - Assess: Tasks assessment should be done with 3 people or more
> - Commit: If the backlog is short, you shouldn't commit strongly on the delivery date

On the other hand, if you:

- manage tasks in silos so that people cannot share their workload
- have a small team (1 or 2 people)
- let people assess alone their own tasks
- commit on small backlogs

Be prepared to work on weekends ! 😅

In the end, my young colleague didn't work on her weekend, we managed to get some time from a more experienced colleague to help her. 😉

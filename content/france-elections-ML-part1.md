---
title: Predicting the Elections with Deep Learning - Part 1 - Results
tags:
  - tag: Coding
    icon: code-braces
  - tag: Data Science
    icon: chart-bubble
  - tag: Humans
    icon: account
  - tag: Machines
    icon: robot
date: 2022-05-13T18:00:00+01:00
thumbnail: uploads/france-elections-ML.png
summary: It's surprising how much you can learn using only anonymized data.
---

> This is a draft article, feel free to make any comment.
> 
> All the code for this study is open source and published on github: 👉[france-elections-ML](https://github.com/qchenevier/france-elections-ML)
> 
> This post is the 1<sup>st</sup> part of a 3-post series:
> - Part 1 - Results. This is actually this blog post. Aimed at a wide audience, you don't have to be a data scientist to read this post.
> - Part 2 - Modeling techniques: learning individual behavior on anonymized data and aggregated labels. Aimed at data scientists.
> - Part 3 - MLops tooling. Aimed at data scientists.


First of all, No, I'm not able to predict who will win the next french elections. But stay there to read cool articles about cool stuff, such as:
- *surprising* insights about voters' behavior
- an *exotic* deep learning technique
- *powerful* MLOps best practices and tooling

Let's see how machine learning techniques can discover facts about individual behavior, without having  any personal data !

## Duty calls - How it started

At the end of the 2<sup>nd</sup> covid lockdown in France, bored at home and lurking on the internet, I stumbled upon a study claiming to explain the results of the last local elections: why did the Left/Ecologist coalition did lose in my city, in contrast with many big french cities which turned *green*? The claim of the article was a bit *cliché*: [The pink city isn't *bobo* (bourgeois bohemian) enough to go green](https://www.jean-jaures.org/publication/la-ville-rose-pas-assez-bobo-pour-passer-aux-verts/).

Hmmm... Wait 🤔 Are they really trying to measure *boboness* ? The only quantitative measurement of the study is the *bobo index*, based on the number of so-called *bobo* stores per 100k people: organic food stores, art galleries, *bobo* clothing stores and ... starbucks, which are supposedly more *bobo* than other fast-food stores.

See below for yourself 👇:
![](https://raw.githubusercontent.com/qchenevier/public_images/master/2022/bobo-index.png)

I have a bunch of criteria of "statistical common sense" to know if a study is worth reading or not. Let's see how this article rates on my "is-it-worth-reading scale":
- studying a concept with a clear definition - KO ❌: *boboness* is ambiguous
- use data collected with a clear methodology - KO ❌: *bobo clothing stores* is ambiguous
- validate the methodology - KO ❌: no evaluation of the predictive power of the *bobo index*
- use diverse examples to apply the methodology - KO ❌: only 2 cities (Bordeaux & Toulouse) are studied

I could have just ignored this article, but seeing such non-sense disguised as *science* made me angry. The next day, I started downloading data to try to show how much the study is flawed. I **had** to **prove** them **wrong**.

<img src="https://imgs.xkcd.com/comics/duty_calls.png" style="display: block; margin-left: auto; margin-right: auto;">

What a fun way to spend your free time, right ? right ? Hmmm... OK OK that's my jam, if it's not yours, don't judge me please.

## Doing my own study - The problem setup

### The tough problem: predicting the elections

Rather than debunking the study step by step, I tried to propose a better methodology by doing my own study.

It turns out that predicting the elections is very tough: there is no obvious solution — otherwise the world would be very different. Before going into more details, let's be clear: I haven't found a reliable solution to this problem. In other words, the model I've trained is not able to predict *reliably* the elections.

Predicting the elections is a tough problem, so it's expected that it can't be solved by a random dude using a few weeks of his free time and only public data.

But that's not what we are aiming for.

### The feasible problem: explaining voters' behavior

Even with a low prediction accuracy, we can derive some interesting insights about voters' behavior from the model. In this case the question we are trying to answer is: **What is the voters' behavior which explains at best the results of the french elections?** In other words, instead of being able to tell if a party will beat another party in a district, we'll be able to tell if a group of people are more likely to vote for a party or to abstain from voting.

Please note that this study **does not prove anything** about voters' behavior. Even if the insights found by the model seem convincing, it's only one of many possible solutions found by the model to fit at best the elections results. In other words, correlation doesn't imply causation.

More over, it's very hard to validate those results. More than looking at the elections results, you have to validate the insights by comparing them with detailed polls of voters profile. And the more variables you consider to explain voters behavior, the more polls you need to conduct...

## The target - what are we trying to predict?

The votes are aggregated in 3510 voting districts and described with 6 columns: 1 key & 5 targets:
- `code_census_tract`: the **census tract code**, which is the key column allowing to join with census data
- <code style="color:darkslategray;">inscrits</code>: the **electoral body**, i.e the number of people who are in the voters' registry
- <code style="color:slategray;">voix</code>: the **voter turnout**, i.e. the number of people who have voted
- <code style="color:red;">gauche</code>: the **<span style="color:red;">left</span> votes**, .i.e. the number of people who have voted for the left
- <code style="color:blue;">droite</code> the **<span style="color:blue;">right</span> votes**, i.e the number of people who have voted for the right
- <code style="color:darkblue;">extreme_droite</code> the **<span style="color:darkblue;">far right</span> votes**, i.e number of people who have voted for the far right

| | `code_census_tract` | <code style="color:darkslategray;">inscrits</code> | <code style="color:slategray;">voix</code> | <code style="color:red;">gauche</code> | <code style="color:blue;">droite</code> | <code style="color:darkblue;">extreme_droite</code> |
|-----:|:--------------------|-----------:|-------:|---------:|---------:|-----------------:|
|    0 | 0101_01004          |       8765 |   6553 |     2257 |     1939 |             2357 |
|    1 | 0101_ZZZZZ          |      10684 |   9007 |     2481 |     2746 |             3780 |
|  ... | ...                 |      ...   |   ...  |     ...  |     ...  |             ...  |
| 3508 | 9598_95018          |      52609 |  36316 |    20440 |     9319 |             6557 |
| 3509 | 9599_95127          |      32343 |  22230 |    12374 |     6356 |             3500 |

Actually, that's not the raw data, as the elections results are given as a number of vote for each candidate. I chose to aggregate the 12 candidates in those 3 categories (left, right, far right) in order to make the problem more understandable & easier to deal with. But that's a source of bias !

For instance, here is how the candidates have been aggregated in 3 categories:
- <code style="color:red;">gauche</code>: Jean-Luc MÉLENCHON, Yannick JADOT, Fabien ROUSSEL, Anne HIDALGO, Nathalie ARTHAUD, Philippe POUTOU
- <code style="color:blue;">droite</code>: Emmanuel MACRON, Valérie PÉCRESSE, Jean LASSALLE
- <code style="color:darkblue;">extreme_droite</code>: Marine LE PEN, Éric ZEMMOUR, Nicolas DUPONT AIGNAN

> **About data visualization**
> 
> Visualizing & understanding the 5 dimensions of the dataset is pretty hard! In addition, the variable are describing districts with very different sizes. Some districts have less than 1k people, whereas other districts have nearly 200k people, it's a 1 to 200 ratio !
> 
> On the **y-axis**, in order to compare apples to apples, I had to normalize each target by each district population. In other words, I plotted the probability of having individual behavior. E.g:
> - 9000 <code style="color:darkslategray;">inscrits</code> in a district of 10000 people is plotted as `0.9` (i.e 90% probability of being registered)
> - 80 <code style="color:slategray;">votes</code> in a district of 100 people is plotted as `0.8` (i.e 80% probability of going to vote)
> 
> Because of the normalization, the district population is not shown, yet it's an important information. I chose to display it as the point size: each point area is proportional to the population. To avoid [overplotting](https://python-graph-gallery.com/134-how-to-avoid-overplotting-with-python), I've set the opacity of each point to 10% only. It might be tricky to see each point individually, but it's an elegant way to visualize the distribution of all the points. The area of each point being proportional to its population, each point contributes to the darkening of the plot according to its population, which allows to gracefully visualize the distribution.
> 
> On the **x-axis**, each normalized target is plotted against the population density, as it is the most explanatory feature: the density explains much of the variance between the districts. In other words, low density (rural) & high density (urban) districts have very different behavior.
> 
> Finally, all scales (x-axis & y-axis) are plotted in logarithmic scale, as we are visualizing variables which are always positive and with wide variation ranges.

### Political engagement: Electoral body & voters turnout

First we consider 2 features about the political engagement of the population:
- <code style="color:darkslategray;">inscrits</code> showing the electoral body (1<sup>st</sup> plot) 
- <code style="color:slategray;">voix</code> showing the voters turnout (2<sup>nd</sup> plot)

<iframe
  src="https://qchenevier.github.io/france-elections-ML/notebooks/truth_voix_inscrits.embed.html"
  style="border:none; width:345px; height:521px; display:block; margin-left:auto; margin-right:auto"
></iframe>

We can see that:
- <code style="color:darkslategray;">inscrits</code> and <code style="color:slategray;">voix</code> decrease when density increases. It could be due to densely populated areas having more population not eligible to vote, such as foreigners or kids. However, some densely populated districts have less 40% of <code style="color:darkslategray;">inscrits</code>, and such extreme value may be also due to a disengagement of the population from the political process. This is unseen in all the rural — sparsely populated — areas.
- <code style="color:darkslategray;">inscrits</code> and <code style="color:slategray;">voix</code> variability increases with density. In other words, the rural world is homogeneous, whereas the urban districts may be very different from one to another.
- dense districts may be big, whereas sparse districts are always small, in terms of population size.

### Political orientation: Votes

Then we consider 3 variables about the political orientation of the population:
- <code style="color:red;">gauche</code> showing the votes for the left (1<sup>st</sup> plot) 
- <code style="color:blue;">droite</code> showing the votes for the right (2<sup>nd</sup> plot)
- <code style="color:darkblue;">extreme_droite</code> showing the votes for the far right (3<sup>rd</sup> plot)

<iframe
  src="https://qchenevier.github.io/france-elections-ML/notebooks/truth_gauche_droite_extreme_droite.embed.html"
  style="border:none; width:345px; height:721px; display:block; margin-left:auto; margin-right:auto;"
></iframe>

We can see that:
- <code style="color:red;">gauche</code> (left votes) is independent from density. Urban areas and rural areas have same rate of left voting, compared to the population size. But compared to the voters' turnout (<code style="color:slategray;">voix</code>), which decreases with density, it means that urban areas vote more for the left in proportion.
- <code style="color:blue;">droite</code> (right votes) decreases with density, but with a high variability. Rural areas vote more for the right. And *some* urban areas vote less for the right, whereas some areas vote more for the right.
- <code style="color:darkblue;">extreme_droite</code> (far right votes) decreases with density: urban areas vote less for the far right, rural areas vote more for the far right, in a pretty homogeneous way.

So, with this first look at the 3 targets and the influence of the density, we can conclude — without any complex modeling — that:
- Rural areas are political strongholds for the right and far right.
- Urban areas are fiercely disputed between the right and the left.

## The features - what information are we leveraging?

Features for each district are computed as:
- <span style="color:darkred">District description</span>:
  - <code style="color:darkred">code_census_tract</code> a key column to define each district with an ID and to join with the other datasets
  - <code style="color:darkred">densite_lognorm</code> (i.e. density but log-normalized) of the district
- <span style="color:indigo">Population groups description</span> in each district:
  - categories describing the personal characteristics of people belonging to the group. Those categories are converted to binary columns using [one-hot encoding](https://www.educative.io/blog/one-hot-encoding): 1 binary column is created for each modality (a.k.a possible value) of each category. For example, the <code style="color:indigo">sex</code> column has 2 categories so 2 binary columns are created:
      - <code style="color:indigo">sexe_1</code> for "male"
      - <code style="color:indigo">sexe_2</code> for "female"
  - <code style="color:indigo">population</code> of each population group

Census records are aggregated together depending on the categories considered to define the population groups. The more categories are selected, the more population groups are created and the more details are given to the model.

I've designed 4 different set of categories, with increasing complexity, and I trained models for each of these configurations. The 4 set of categories are:
- `zero`
  - `sex`: 2 categories
- `minimal`
  - all the `zero` features
  - `indicateur_nationalite_condense_francais_etranger`: 2 categories
  - `statut_conjugal`: 6 categories
  - `appartenance_logement_organisme_HLM`: 3 categories
- `light`
  - all the `minimal` features
  - `age_quinquennal_annees_revolues`: 20 categories
- `complex`
  - all the `light` features
  - `diplome_plus_eleve`: 12 categories
  - `categorie_socioprofessionnelle_8_postes`: 8 categories
- `full`
  - all the `complex` features
  - `activite_economique_17_postes_na_a17`: 17 categories
  - `mode_transport_principal_plus_souvent_utilise_pour_aller_travailler`: 7 categories

### Features `zero`

The purpose of this feature set is to define a baseline performance with the [simplest model possible](https://blog.insightdatascience.com/always-start-with-a-stupid-model-no-exceptions-3a22314b9aaa). The goal of building a "model `zero`" is to understand our problem better & to perform some basic tests. In other words, it's a model that helps you understand if there is something wrong in your data or in more complex models.

So for this feature set, I've retained only 1 categorical feature:
- `sex` (2 categories): male & female.

This features dataset has:
- 2 columns to define to population groups, out of 5 columns in total.
- 7018 rows, 2 rows per district (1 per `sex` modality).

Here is, as example, the features `zero` for the 1<sup>st</sup> district in the dataset:

|   <code style="color:darkred">code_census_tract</code> |   <code style="color:darkred">densite_lognorm</code> |   <code style="color:indigo">sexe_1</code> |   <code style="color:indigo">sexe_2</code> |   <code style="color:indigo">population</code> |
|--------------------:|------------------:|---------:|---------:|-------------:|
|          0101_01004 |           1.13658 |        1 |        0 |      6818.58 |
|          0101_01004 |           1.13658 |        0 |        1 |      7227.65 |

### Features `minimal`

The purpose of this feature set is to use basic features, for which I expect that the model will learn some already-known correlations.

For this configuration, I've retained all the `zero` configuration features and added the following categories:
- `indicateur_nationalite_condense_francais_etranger` (2 categories): These features allow to identify foreigners & citizens in the population. I expect the model to learn that only citizens can vote for the elections.
- `appartenance_logement_organisme_HLM` (3 categories): These features allow to identify the social housing recipients in the population, which is a strong indicator of wealth — or more precisely, an indicator of poverty. I expect the model to learn that citizens benefitting form social housing are more likely to vote for the left.
- `statut_conjugal` (6 categories): These features allow to identify the marital status of people. I expect the model to learn that citizens which are married citizens vote more on the right. This kind of behavior has already been [shown in other countries](https://www.jstor.org/stable/2748737?seq=1).
  
This dataset has:
- 13 columns to define population groups, out of 16 columns in total.
- 162685 rows, ~46 rows per district. This is 2/3 of the theoretical limit, which is 72 rows per district (6 * 3 * 2 * 2) if all the possible groups were present in all the districts.

### Features `light`

The purpose of this feature set is to add some complex features, but still using features for which I expect that the model will learn some already-known correlations.

For this configuration, I've retained all the `zero` & `minimal` configuration features and added the following categories:
- `age_quinquennal_annees_revolues` (25 categories): 1 age class every 5 years. I expect the model to find that:
  - older people tend to vote more and to vote more for the right
  - younger people tend to vote less and to vote more for the left

This dataset has:
- 38 columns to define population groups, out of 41 columns in total
- 1.17 million rows, ~335 rows per district. This is 1/5 of the theoretical limit, which is 1800 rows per district (6 * 3 * 2 * 2 * 25) if all the possible groups were present in all the districts.

### Features `complex`

The purpose of this feature set is to add features which might have predictive power, but for which I don't have any strong prior on the expected behavior of the model.

For this configuration, I've retained all the `zero`, `minimal` & `light` configuration features and added the following categories:
- `diplome_plus_eleve` (12 categories): These features describe the highest diploma using 12 classes ranging from "no diploma, education interrupted before primary school" to "PhD".
- `categorie_socioprofessionnelle_8_postes` (8 categories): These features describe the socio-professional category using 8 classes. E.g: farmer, worker, manager, retired.

This dataset has:
- 59 columns to define population groups, out of 62 columns in total
- 6.3 million rows, ~1795 rows per district. This is 1/100 of the theoretical limit, which is 172800 rows per district (6 * 3 * 2 * 2 * 25 * 12 * 8) if all the possible groups were present in all the districts.

### Features `full`

The purpose of this feature set is to add features for which I'm not convinced if they have predictive power.

For this configuration, I've retained all the `zero`, `minimal`, `light` & `complex` configuration features and added the following categories:
- `activite_economique_17_postes_na_a17` (17 categories): These features describe the economic sector using 17 classes. E.g: retail, transportation, financial services.
- `mode_transport_principal_plus_souvent_utilise_pour_aller_travailler` (7 categories): These features describe how the people commute to work using 7 classes. E.g: car, bike, public transportation.

This dataset has:
- 84 columns to define population groups, out of 87 columns in total
- 9.1 million rows, ~2600 rows per district. This is 1/10000 of the theoretical limit, which is 2 million rows per district (6 * 3 * 2 * 2 * 25 * 12 * 8 * 17 * 7) if all the possible groups were present in all the districts.

## The predictions & the errors - what are we predicting?

For recall, we have 5 targets:
- electoral body
- voter turnout
- left vote
- right vote
- far right vote 

And 5 models able to predict those 5 targets using various features:
- `zero`
- `minimal`
- `light`
- `complex`
- `full`

Let's see how these models behave on these various prediction tasks.

### Electoral body & voter turnout

You can see below a data visualisation of the 5 models predictions. From left to right, the models are increasingly complex (more features, more neurons):`zero` → `minimal` → `light` → `complex` → `full`. The 6<sup>th</sup> (and last) plot is the ground truth (a.k.a the target), which the models are trying to reproduce.

As expected:
- the model `zero` seems very basic and pretty far from the truth
- if a model is more complex (i.e. more on the right), then its predictions are closer to the truth

Looking at those prediction plots, the complex models' predictions seem to be very close to the truth. Yet this could be an optical illusion: actually the best practice is to look at the **error** of the model, not the prediction.

<iframe
  src="https://qchenevier.github.io/france-elections-ML/notebooks/predictions_voix_inscrits.embed.html"
  style="border:none; width:1345px; height:521px; max-width:1345px; margin-left:-100px;"
></iframe>

For a regression problem, a common error metric is the absolute error (`|prediction - truth|`): it is the metric I've used to train the model (a.k.a the loss function). However for practical reasons, as sometimes the target can be very small, the absolute error can look like it's very small, whereas the model is in actually very far relatively from the truth.

So I rather chose to plot the **error ratio** (`prediction / truth`), which shows much better relative differences (and not absolute differences). This metric is suitable here as both the prediction and the truth are strictly positive. Please note that the best error ratio is 1 (or 100%): the 6<sup>th</sup> and last plot shows the error ratios for the truth, which are obviously all equals to 1. This is the target for all the models.

You can see below the plots of the error ratios for the 5 models and the truth.

Not so surprisingly, even if the predictions plots looked very promising, these error ratio plots show that the models are far from being perfect.

As expected:
- the model `zero` has error ratios ranging from 50% to 200%. In other words, the errors are ranging from -50% to +100%.
- if a model is more complex (i.e. more on the right), then the range of its error ratios is smaller.

In the end, the best model is the model `full` which has error ratios ranging from 70% to 130%, i.e. errors ranging from -30% to +30%. If we zoom in, we see that the majority of the values are in the **-15% to +15% error range**. I expected a much lower performance on such a hard prediction task, that's good news !

<iframe
  src="https://qchenevier.github.io/france-elections-ML/notebooks/residuals_voix_inscrits.embed.html"
  style="border:none; width:1345px; height:521px; max-width:1345px; margin-left:-100px;"
></iframe>

Yet, predicting the size of the electoral body and the voter turnout is not particularly valuable. What kind of decision can you help with such a prediction ? It may be an astonishing performance but who cares ? 😅

<img src="https://c.tenor.com/Gs0fJw2jM0AAAAAd/who-cares-gina-linetti.gif"  style="display: block; margin-left: auto; margin-right: auto;">

### Political leaning

While the performance on electoral body & voter turnout is encouraging, the valuable task is predicting the political leaning: left, right and far right votes, as the overarching — yet impractical — goal is to be able to predict which party is able to win the election in each district.

So how do our 5 models perform on such a prediction task ?

Looking at the prediction plots below, we notice the same outcome than for the preceding task (electoral body & voter turnout):
- the model `zero` seems very basic and pretty far from the truth
- if a model is more complex (i.e. more on the right), then its predictions are closer to the truth

However, we notice already that the predictions are visually different from the truth, even for the most complex models, especially for the left and far right votes.

<iframe
  src="https://qchenevier.github.io/france-elections-ML/notebooks/predictions_gauche_droite_extreme_droite.embed.html"
  style="border:none; width:1345px; height:721px; max-width:1345px; margin-left:-100px;"
></iframe>

Let's have a look at the error ratios below: we can see that the range of the error ratio are bigger on those prediction tasks:
- the model `zero` has error ratios ranging from 30% to 350%. In other words, the errors are ranging from -70% to +250%.
- but still, if a model is more complex (i.e. more on the right), then the range of its error ratios is smaller.

In the end, the best model is also the model `full`:
- The <span style="color:red;font-weight:bold">left</span> votes have the lowest prediction performance: error ratios ranging from 40% to 215%, i.e. errors ranging from -60% to +115%. If we zoom in, we see that **most of the values are in -35% to +30% error range**.
- The <span style="color:blue;font-weight:bold">right</span> votes have the highest prediction performance: error ratios ranging from 55% to 180%, i.e. errors ranging from -45% to +80%. If we zoom in, we see that **most of the values are in the -25% to +25% error range**.
- The far right votes have a prediction performance between those 2 maxima

<iframe
  src="https://qchenevier.github.io/france-elections-ML/notebooks/residuals_gauche_droite_extreme_droite.embed.html"
  style="border:none; width:1345px; height:721px; max-width:1345px; margin-left:-100px;"
></iframe>

While this result seems impressing at first sight, it renders the prediction useless. To be able to be answer the "million dollar question" (which party will win the elections ?), political leaning predictions need to be much more precise: 1 or 2% maximum is necessary, as scores from various parties may be very close to each other in many districts. Otherwise, with a prediction less reliable than that, the model predicts reliably the victory of a party over the other only in districts where there is a wide gap, and for which the result is already well known. In other words, if not precise enough, the model is only able to predict things we know already.

However, this shows that the models have learned some typical voters' behavior, allowing it to perform a prediction with a pretty good performance. The predictions aren't precise enough to be useful, but the understanding of **how the model computes his prediction** may be valuable !

## The explanations - what have we learnt about voter behavior?

To analyze a linear regression model behavior, you just have to read the coefficients of the regression function. Since the model is a neural network with several layers, it's not possible to extract a simple coefficient. That's why the neural network has a more complex behavior, but it is harder to understand its inner workings. That's where [explainability techniques](https://christophm.github.io/interpretable-ml-book/) are useful: making sense of very complex behavior. The most common methods compute "explanations", which are a set of coefficients describing the model behavior in a specific context (i.e. near a specific data point).

Since the model is not linear, explanations are dependent on context: for each data point, the influence of each feature may be different. To explain the models' behavior, I used the Shapley values, computed by the [SHAP python module](https://shap.readthedocs.io/en/latest/index.html), which is a widely used approach. The core idea is to allocate influence of input features on a model's output using cooperative game theory. In other words, it's a method to allocate **how much a feature influenced the prediction?**

For each example presented to the model, the method computes how much each feature has influenced the model result:
<img src="https://raw.githubusercontent.com/slundberg/shap/master/docs/artwork/shap_header.svg#svgView(viewBox(0,140,537.64,301.63))" style="margin-bottom:-190px">

For a set a 200 examples, 200 explanations are computed, so the plot displays 1 point per example per feature:
It's a 2 dimensional plot:
- on the x-axis: the SHAP value, i.e. the influence on the prediction
- in color, the feature value: ranging from blue (min) to red (max)

You can read all the following explanations plots using those 2 rules:
- <span style="color:blue">blue points ᠅</span> on the left ⬅️ & <span style="color:red">red points ᠅</span> on the right ➡️ mean that the feature has a tendency to increase ⬆️ the predicted value
- <span style="color:red">red points ᠅</span> on the left ⬅️ & <span style="color:blue">blue points ᠅</span> on the right ➡️ mean that the feature has a tendency to decrease ⬇️ the predicted value

In the below example — from the [SHAP documentation](https://shap.readthedocs.io/en/latest/index.html) — we can see that the `LSTAT` feature is decreasing ⬇️ the prediction:
![](https://raw.githubusercontent.com/slundberg/shap/master/docs/artwork/boston_beeswarm.png)

You'll see below the explanations for the 5 targets of each model, one model at a time. Explanations are computed with 200 examples, hence we have 200 points for each line & column.

### Model `zero`

For this simple model `zero`, explanations are describing the impact of the first 2 groups of features of this configuration.

**Population density** — displayed as `Densité (log normalisée)` — has a big impact on the prediction, as expected. People living in more dense areas:
- are **less engaged** in the electoral process (`inscrits` and `voix`)
- vote **more** for the <span style="color:darkblue;font-weight:bold">far right</span>

**Gender** — displayed as `Sexe`: the `Femmes` (women) seem to be **more engaged** in the electoral process than `Hommes` (men), with a higher probability of being in the electoral body & a lower voter turnout. I guess that gender is not really the cause of a different voting behavior, but it is used by the model as a **proxy of age**, which is known to influence voting behavior. In other words, districts which have a lower masculinity rate are actually districts with an older population. The imbalance in gender representation due to population age is due to the difference in life expectancy. As women live longer than men, an older population has a lower masculinity rate.

<iframe
  src="https://qchenevier.github.io/france-elections-ML/notebooks/shap_explanations_model_zero_seed1000_id001.embed.html"
  style="border:none; width:1670px; height:216px; max-width:1670px; margin-left:-259px;"
></iframe>

### Model `minimal`

The model `minimal` and its explanations allow to assess the influence of 3 additional groups of features: nationality, social housing & marital status.

**Nationality** — displayed as `Indicateur de nationalité condensé (Français/Étranger)`: `Étrangers` (strangers) are strongly **less engaged** in the electoral process. In reality, the probability of their engagement is 0: foreigners are not allowed to vote to the presidential elections in France.

**Social housing** — displayed as `Appartenance de logement à un organisme HLM`: 
- people who have a `Logement appartenant à un organisme HLM` (i.e. beneficiary from social housing) do **not vote more** for the <span style="color:red;font-weight:bold">left</span>, contrary to what was expected. But still we see that they are **less engaged** in the election process, which is coherent with statistics.
- people which are `Hors logement ordinaire` (out of ordinary housing) form [an heterogeneous group comprising homeless people & travelling people but also people in retirement homes](https://www.insee.fr/fr/statistiques/fichier/2586036/LOGFRA17f4_F1.4.pdf). This group seem to be **more engaged** in the electoral process according to the SHAP values, yet I can't find a rationale for that.

**Marital status** — displayed as `Statut conjugal`:
- people who are `Pacsé(e)` (civil union) or `Veuf, veuve` (widowed) seem to be **strongly more engaged** in the electoral process (which is counter-intuitive to me).
- people who are in `Concubinage ou union libre` (cohabitation or common-law) seem to be vote **more** for the <span style="color:red;font-weight:bold">left</span>.

<iframe
  src="https://qchenevier.github.io/france-elections-ML/notebooks/shap_explanations_model_minimal_seed1000_id003.embed.html"
  style="border:none; width:1670px; height:436px; max-width:1670px; margin-left:-259px;"
></iframe>

In this model, **density** and **gender** seem to have much less influence on the prediction than for the model `zero`, once we have introduced other features. This is pretty reassuring in terms of causality. Those 2 features are used as **data proxy** for other features by the model, but the model discards them to use other features closer to the root cause once they are introduced.

So, what happens if we add more features ?

### Model `light`

The model `light` explores the influence of 1 additional group of features: the age.

**Age** — displayed as `Âge quinquennal en années révolues`.
- people who are *minor* — below 19 years:
  - are **strongly less engaged** in the electoral process. Indeed, as the age of majority is 18, the true probability of voting in this class is nearly 0.
- people who are *young* — from 25 to 34 years:
  - are **less engaged** in the electoral process. 
  - but vote **more** for the <span style="color:red;font-weight:bold">left</span>. This is salient for the 25-29 age class, but is visible also for the 20-24 age class.
- people who are *mature adults* — from 35 years to 64 years:
  - are **more engaged** in the electoral process
  - and they vote **less** for the <span style="color:red;font-weight:bold">left</span>
- people who are *old* — from 65 to 99 years:
  - are **strongly engaged** in the electoral process

<iframe
  src="https://qchenevier.github.io/france-elections-ML/notebooks/shap_explanations_model_light_seed1000_id005.embed.html"
  style="border:none; width:1670px; height:936px; max-width:1670px; margin-left:-259px;"
></iframe>

### Model `complex`

The model `complex` allows to understand the influence of 2 additional group of features: the highest diploma (i.e. the education level) and the socio-professional category.

**Highest diploma** — displayed as `Diplôme le plus élevé`:
- people **without any diploma** (the first 3 classes):
  - are **less engaged** in the electoral process
  - vote **less** for the <span style="color:red;font-weight:bold">left</span>
- people with **higher education** vote **less** the <span style="color:darkblue;font-weight:bold">far right</span>
- for the other classes and targets, the model seems to have an erratic behavior

**Socio-professional category** — displayed as `categorie_socioprofessionnelle_8_postes`:
- `Autres personnes sans activité professionnelle` (unemployed people)
  - are **less engaged** in the electoral process
  - vote **more** for the <span style="color:darkblue;font-weight:bold">far right</span>
- `Retraités` (retirees)
  - are **very engaged** in the electoral process
  - vote **more** for the <span style="color:blue;font-weight:bold">right</span>
- `Artisans, commerçants et chefs d'entreprise` (artisans, merchants & business executives) and `Cadres et profession intellectuelles supérieures` (executives & intellectual professions)
  - are **highly engaged** in the electoral process
  - vote **more** for the <span style="color:blue;font-weight:bold">right</span>
- `Ouvriers` (workers) are **the least engaged** in the electoral process
- `Employés` (employees) and `Professions intermédiaires` (intermediate professions) are the only 2 categories which
  - are voting **more** for the <span style="color:red;font-weight:bold">left</span>
  - even if they are **less engaged** in the electoral process.

<iframe
  src="https://qchenevier.github.io/france-elections-ML/notebooks/shap_explanations_model_complex_seed1000_id007.embed.html"
  style="border:none; width:1670px; height:1356px; max-width:1670px; margin-left:-259px;"
></iframe>

### Model `full`

The model `full` allows to explore 2 additional group of features: the economic activity and the mode of transportation.

**Economic activity** — displayed as `Activité économique en 17 postes (NA - A17)`:
- Some categories vote **more** for the <span style="color:darkblue;font-weight:bold">far right</span>:
  - `Commerce ; réparation d'automobiles et de motocycles` (retail & auto repair)
  - `Fabrication d'autres produits industriels` (other industrial products' manufacturing)
- Some categories vote **more** for the <span style="color:red;font-weight:bold">left</span>:
  - `Administration publique, enseignement, santé humaine et action sociale` (public administration, education, healthcare and social action)
  - `Construction` (building)
  - `Fabrication de matériels de transport` (transport equipment manufacturing)
  - `Hébergement et restauration` (hospitality and catering)
  - `Autres activités de services` (other services)
- Some categories vote **more** for the <span style="color:blue;font-weight:bold">right</span>:
  - `Activités financières et d'assurance` (finance and insurance)
  - `Fabrication de denrées alimentaires, de boissons et de produits à base de tabac` (food, beverages and tobacco products)

**Mode of transportation** — displayed as `Mode de transport principal le plus souvent utilisé pour aller travailler`:
- People commuting with `Transports en communs` (public transportation) or `Vélo (y compris à assistance électrique)` (bike and electric bike) vote **more** for the <span style="color:red;font-weight:bold">left</span>.
- People using `Voiture, camion, fourgonnette` (car, truck) vote **more** for the <span style="color:darkblue;font-weight:bold">far right</span>. This may be due to a correlation with living in a rural area.
- People using soft mobility means like `Marche à pied (ou rollers, patinette)` (walking, skates, scooter) are **less engaged** in the electoral process. This may be due to a correlation with young age. 

<iframe
  src="https://qchenevier.github.io/france-elections-ML/notebooks/shap_explanations_model_full_seed1000_id009.embed.html"
  style="border:none; width:1670px; height:1856px; max-width:1670px; margin-left:-259px;"
></iframe>

## Conclusion

**Unexpected results using only public data!** — The results suggests that the model has learned to identify the most well-known stereotypical political behavior, with a quite precise granularity, but using only anonymized, aggregated and public data. I did not expect this experiment to perform so well.

**Questions about the power of our digital overlords** — Those results can be seen as virtual polls. Less precise but much cheaper than real polls. But can you imagine redoing this study with much more precise census data, like the facebook data? I guess the level of performance and the insights we would derive would be decisive informations to help win an election. Our digital overlords have a huge power at hand, because this experiment shows that it's pretty simple to leverage their data and weaponize it to favor a candidate over another.

**Qualitative only results** — Those are qualitative results. I tried to compute quantitative results, to be able to compare it directly to the polls present in [IPSOS polls](https://www.ipsos.com/sites/default/files/ct/news/documents/2022-04/Ipsos%20Sopra%20Steria_Sociologie%20des%20e%CC%81lectorats_10%20Avril%2020h30.pdf), but the performance was too bad.


**It's still pseudo-science** — This study doesn't score very well on my "is-it-worth-reading scale", mainly because the main results are qualitative:
- studying a concept with a clear definition - OK ✅: clear definition of `inscrits`, `votes`, `gauche`, `droite`, `extreme_droite`.
- use data collected with a clear methodology - OK ✅: official census & elections results data
- validate the methodology - Unclear 🤨: The qualitative results seem to be coherent with real polls such as [IPSOS polls](https://www.ipsos.com/sites/default/files/ct/news/documents/2022-04/Ipsos%20Sopra%20Steria_Sociologie%20des%20e%CC%81lectorats_10%20Avril%2020h30.pdf), but still it's only qualitative results. The method I've shown is **mainly a cherry picking of qualitative results** which seem to match what we see in the data, so I wouldn't call that a "validated scientific methodology".
- use diverse examples to apply the methodology - Unclear 🤨: I did the study using 5 different configurations (`zero`, `light`, `minimal`, `complex`, `full`), which are providing coherent results. But still, we would need to perform the same study on another election dataset to see if we would find similar results.

**A first glimpse into true causality**: Thanks to explainability methods, we've seen that some features may seem important in the prediction (e.g: density) for simple models but they are dropped by the more complex models as soon as more powerful features are found. This is giving us a hint about true causality: features such as density are proxy for other more informative features, which are closer to the true root cause.

Thanks for reading! Feel free to share any advice or comments about this work !

And stay tuned about the follow-up articles:
- a blog post about the specific modeling techniques used in this project: learning individual behavior on anonymized data and aggregated labels
- a blog post about the MLOps tooling used in this project



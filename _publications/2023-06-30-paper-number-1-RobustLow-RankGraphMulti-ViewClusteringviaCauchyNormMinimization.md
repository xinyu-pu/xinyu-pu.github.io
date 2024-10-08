---
title: "Robust Low-Rank Graph Multi-View Clustering via Cauchy Norm Minimization"
collection: publications
authors: <b>Xinyu Pu</b>, Hangjun Che, Baicheng Pan
permalink: /publication/2023-6-30-paper-number-1-RobustLow-RankGraphMulti-ViewClusteringviaCauchyNormMinimization
excerpt: "This paper is about the robust graph-based multiview clustering. A novel multi-view clustering method referred to as RLGMC is proposed. In this method, we combine spectral embedding, low-rank tensor learning and noise constraints into a unified framework. By learning a robust tensor, the underlying structure implied in multiple views is effectively captured."
date: 2023-06-30
venue: 'Mathematics'
paperurl: 'https://doi.org/10.3390/math11132940'
---

<img src='https://xinyu-pu.github.io/images/publication1flow.png'>
 
Abstract
===
Graph-based multi-view clustering methods aim to explore the partition patterns by utilizing a similarity graph. However, many existing methods construct a consensus similarity graph based on the original multi-view space, which may result in the lack of information on the underlying low-dimensional space. Additionally, these methods often fail to effectively handle the noise present in the graph. To address these issues, a novel graph-based multi-view clustering method which combines spectral embedding, non-convex low-rank approximation and noise processing into a unit framework is proposed. In detail, the proposed method constructs a tensor by stacking the inner product of normalized spectral embedding matrices obtained from each similarity matrix. Then, the obtained tensor is decomposed into a low-rank tensor and a noise tensor. The low-rank tensor is constrained via nonconvex low-rank tensor approximation and a novel Cauchy norm with an upper bound is proposed to handle the noise. Finally, we derive the consensus similarity graph from the denoised low-rank tensor. The experiments on five datasets demonstrate that the proposed method outperforms other state-of-the-art methods on five datasets. 


---
[[paper]](https://doi.org/10.3390/math11132940)
[[bibtex]](https://xinyu-pu.github.io/files/mathematics-v11-i13_20231207.bib)

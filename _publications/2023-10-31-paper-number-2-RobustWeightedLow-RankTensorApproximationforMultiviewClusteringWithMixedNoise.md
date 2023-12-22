---
title: "Robust Weighted Low-Rank Tensor Approximation for Multiview Clustering With Mixed Noise"
collection: publications
authors: <b>Xinyu Pu</b>, Hangjun Che, Member, IEEE, Baicheng Pan, Man-Fai Leung, and Shiping Wen
permalink: /publication/2023-10-31-paper-number-2-RobustWeightedLow-RankTensorApproximationforMultiviewClusteringWithMixedNoise
excerpt: "In this paper, a robust multiview clustering method referred to as RWLTA is developed to handle the mixed noise embedding in the real-world datasets. The weighted low-rank tensor approximation and unique mixed noise handling norms are utilized to guarantee performance and robustness."
date: 2023-10-31
venue: 'IEEE Transactions on Computational Social Systems'
paperurl: 'https://doi.org/10.1109/TCSS.2023.3331366'
---

<img src='https://xinyu-pu.github.io/images/publication-2-flow.png'>
 
Abstract
===
Multiview clustering performs grouping a set of objects by utilizing complementary information from multiple views. Unfortunately, the clustering performance degenerates dramatically if the views are corrupted by noise. To overcome this limitation, we propose a robust multiview clustering approach based on weighted low-rank tensor approximation and noise separation. The proposed model improves the performance through a low-rank approximation function and weighted singular values. The weighted low-rank tensor approximation method considers both prior knowledge and the physical meanings associated with different singular values, leading to superior performance in capturing high-order correlations. Additionally, to eliminate mixed noise, a novel $l_{Cauchy,1}$ norm is developed to handle outliers, and the $l_1$ and Frobenius norms are used to handle random corruptions and slight perturbations, respectively. A high-efficiency optimization algorithm based on the alternating direction method of multipliers (ADMM) is designed to address the challenging proposed model. Experimental results on nine real-world datasets show that the proposed approach outperforms eight state-of-the-art multiview methods. Furthermore, experiments on various kinds of noise demonstrate the superior robustness of the proposed approach. Especially, in the mixed noise condition, the proposed approach is significantly superior to other methods. 


---
[[paper]](https://doi.org/10.1109/TCSS.2023.3331366)
[[code]](https://github.com/xinyu-pu/TCSS2023-RWLTA-code-improved.git)
[[bibtex]](https://xinyu-pu.github.io/files/TCSS-RWLTA.bib)

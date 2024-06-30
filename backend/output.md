# Clustering for embedding for tiny chunks

## Clustering Method

A paper suggests using clustering for the RAG problems (which can only retrieve short, contiguous chunks of text). Method:

1. Create chunks
2. Embed chunks
3. GMM cluster embedding
4. Summarize chunks
5. Use those chunks to repeat Step 2

## Personal question & critique

**Personal question & critique:** 
The result isn't that good, and I wonder if generating a chunk summary isn't the best way to synthesize the info? Chunks after clustering are similar but have different info in random orders. It might end up with repetitive info in places

## Ideas

**Ideas:**
1. What if we use a key points/knowledge tree rather than a summary?
2. What if instead of using GMM, we use LLM for clustering?
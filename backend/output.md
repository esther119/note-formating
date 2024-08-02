# Data Partition for Vector Database

## Problem

As data grow in a pinecone namespace, the cost grows exponentially. How to partition the data?

## Idea from Design a Data-Intensive Application

### Partitioning of Key-Value Data

- The goal of partitioning is to spread data evenly across nodes, and more importantly to avoid having **skewed** partitions with most of the load (resulting in **hot spots**).
- Partitioning by hash key, that is, by using a non-cryptographic hash function (e.g. MD5), and partition using range of hashes instead of keys.
    + This technique is good at distributing keys fairly among the partitions. The partition boundaries can be evenly spaced, or they can be chosen pseudorandomly (in which case the technique is sometimes known as **consistent hashing**).
    + Unfortunately, however, by using the hash of the key for partitioning we lose a nice property of key-range partitioning: the ability to do efficient range queries.

### Solution

- Cassandra can be declared with a **compound primary key** consisting of several columns. Only the first part of that key is hashed to determine the partition, but the other columns are used as a concatenated index for sorting the data in Cassandra's SSTables.

## Partitioning of Secondary Indexes

### Example

For example, imagine you are operating a website for selling used cars (illustrated in Figure 6-4). Each listing has a unique ID—call it the **document ID**—and you partition the database by the document ID (for example, IDs 0 to 499 in partition 0, IDs 500 to 999 in partition 1, etc.). You want to let users search for cars, allowing them to filter by color and by make, so you need a secondary index on color and make (in a document database these would be fields; in a relational database they would be columns).

### Options

- One option is to add an extra secondary index inside every partition, this index would cover-up only the keys in the partition. However, if the client needs to find all fields with a common secondary field, it has to query all partitions.
- Another option is to have a global secondary index which can also be partitioned, but using **term** instead of **document**. Every partition would keep a secondary index of some of these terms, this makes reads more efficient, but writes are slower and complicated. However, in practice updates to global secondary indexes are asynchronous and very fast.
import { gql, useQuery } from "@apollo/client";
import { Container, Typography } from "@mui/material";
import React from "react";
import { BlogPost } from "./Blog-post";

export const BlogPage = () => {
  const { loading, error, data } = useQuery(gql`
    query mq {
      list {
        id
        author
        text
        title
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Container>
      <Typography variant="h3" style={{ marginBottom: "1em" }}>
        Blog
      </Typography>

      {data.list.map((post) => (
        <BlogPost key={post.id} data={post}></BlogPost>
      ))}
    </Container>
  );
};

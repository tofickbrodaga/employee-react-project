import React, { useEffect } from "react";
import { Card } from "@consta/uikit/Card";
import { Text } from "@consta/uikit/Text";
import { Grid } from "@consta/uikit/Grid";
import { useDispatch, useSelector } from "react-redux";
import { setNews } from "../../store/store";

const MainPage = () => {
  const dispatch = useDispatch();
  const mainNews = useSelector((state) => state.mainNews);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://673423afa042ab85d1190055.mockapi.io/api/v1/main');
        const data = await response.json();
        dispatch(setNews(data));
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [dispatch]);

  const renderNewsCard = (publication) => (
    <Card
      key={publication.id}
      verticalSpace="l"
      horizontalSpace="l"
      shadow
      style={{
        paddingBottom: "1rem",
        backgroundColor: '#fff',
        borderRadius: '8px',
        border: "solid 1px",
        position: "relative"
      }}
    >
      <Text weight="bold" size="l" style={{ marginBottom: '10px', color: '#333' }}>
        {publication.name}
      </Text>
      <Text size="m" style={{
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 4,
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}>
        {publication.description}
      </Text>
      <Text style={{ width: "100%", display: "flex", justifyContent: "right", marginTop: "1rem" }}>
        {publication.createdAt}
      </Text>
    </Card>
  );

  return (
    <Grid cols={1} gap="x1" style={{ gap: "2rem" }}>
      {mainNews.map(renderNewsCard)}
    </Grid>
  );
};

export default MainPage;

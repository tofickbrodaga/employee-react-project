import React, { useEffect } from 'react';
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, GridItem } from '@consta/uikit/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { setServices } from '../../store/store';
import { getToken } from '../../services/token';

const ServicePage = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = getToken();

    if (!userToken) {
      navigate("/login");
      return;
    }

    const fetchServices = async () => {
      try {
        const response = await fetch('https://673423afa042ab85d1190055.mockapi.io/api/v1/services');
        const data = await response.json();
        dispatch(setServices(data));
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, [dispatch, navigate]);

  return (
    <Grid gap="xl" cols={3}>
      {services.length > 0 ? (
        services.map((service) => (
          <GridItem key={service.id}>
            <Card verticalSpace="xs" horizontalSpace="xs" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
              <img src={service.image} alt={service.name} width="200px" style={{ borderRadius: "15px" }} />
              <div>
                <Text weight="bold">{service.name}</Text>
                <Text>{service.description}</Text>
                <Link to={`/service/${service.id}`}>
                  <Text as="span" view="link">Подробнее</Text>
                </Link>
              </div>
            </Card>
          </GridItem>
        ))
      ) : (
        <Text>Загрузка...</Text>
      )}
    </Grid>
  );
};

export default ServicePage;

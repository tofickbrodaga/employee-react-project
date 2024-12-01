import React, { useEffect, useState } from 'react';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import { useNavigate, useParams } from 'react-router-dom';
import { getToken } from '../../services/token';

const ServiceDetailPage = () => {
  const [service, setService] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = getToken();

    if (!userToken) {
      navigate("/login");
      return;
    }

    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(`https://673423afa042ab85d1190055.mockapi.io/api/v1/services/${id}`);
        const serviceData = await response.json();
        setService(serviceData);
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };

    fetchServiceDetails();
  }, [id, navigate]);

  const handleNextService = () => {
    const nextServiceId = (parseInt(id, 10) + 1).toString();
    navigate(`/service/${nextServiceId}`);
  };

  return (
    <div style={{ alignItems: "center", display: "flex", flexDirection: "column", gap: "2rem" }}>
      {service ? (
        <>
          <Text style={{ fontSize: "1.5rem" }}>{service.name}</Text>
          <img src={service.image} width="500px" style={{ borderRadius: "15px" }} alt={service.name} />
          <Text>{service.description}</Text>
          <Button onClick={handleNextService} label="Следующая услуга" />
        </>
      ) : (
        <Text>Загрузка...</Text>
      )}
    </div>
  );
};

export default ServiceDetailPage;

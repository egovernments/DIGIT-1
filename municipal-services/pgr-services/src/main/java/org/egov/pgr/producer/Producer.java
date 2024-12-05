package org.egov.pgr.producer;

import javax.validation.Valid;

import org.egov.common.utils.MultiStateInstanceUtil;
import org.egov.pgr.web.models.appeal.AppealRequest;
import org.egov.tracer.kafka.CustomKafkaTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class Producer {

    @Autowired
    private CustomKafkaTemplate<String, Object> kafkaTemplate;

    @Autowired
    private MultiStateInstanceUtil centralInstanceUtil;

    public void push(String tenantId, String topic, Object value) {

        String updatedTopic = centralInstanceUtil.getStateSpecificTopicName(tenantId, topic);
        log.info("The Kafka topic for the tenantId : " + tenantId + " is : " + updatedTopic);
        kafkaTemplate.send(updatedTopic, value);
    }

	public void pushAppealRequest(@Valid AppealRequest request, String topic) {
		kafkaTemplate.send(topic, request);
	}
}

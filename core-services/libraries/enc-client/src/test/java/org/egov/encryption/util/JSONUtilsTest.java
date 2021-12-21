package org.egov.encryption.util;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.Configuration;
import com.jayway.jsonpath.Option;
import lombok.extern.slf4j.Slf4j;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.*;


@Slf4j
public class JSONUtilsTest {

    ObjectMapper mapper;
    Configuration configuration;

    private static final String REQUEST_INFO_NULL = "{\"RequestInfo\":{\"api_id\":\"1\",\"ver\":\"1\",\"ts\":null,";
    private static final String ACTION_CREATE_REQUESTER_ID = "\"action\":\"create\",\"did\":\"\",\"key\":\"\",\"msg_id\":\"\",\"requester_id\":\"\",";
    private static final String AUTH_TOKEN_MALE = "\"auth_token\":null},\"User\":{\"userName\":\"ajay\",\"name\":\"ajay\",\"gender\":\"male\",";
    private static final String MOBILE_NUMBER_CITIZEN_PASSWORD_LAST = "\"mobileNumber\":\"12312312\",\"active\":true,\"type\":\"CITIZEN\",\"password\":\"password\"}}";
    private static final String MOBILE_NUMBER_CITIZEN_PASSWORD = "\"mobileNumber\":\"12312312\",\"active\":true,\"type\":\"CITIZEN\",\"password\":\"password\"},";
    private static final String USER_NAME_MOBILE_NUMBER = "{\"userName\":\"ajay\",\"name\":\"ajay\",\"gender\":\"male\",\"mobileNumber\":\"12312312\",";
    private static final String ACTIVE_CITIZEN_PASSWORD = "\"active\":true,\"type\":\"CITIZEN\",\"password\":\"password\"}]}";

    @Before
    public void initializeCommonObjects() {
        JsonFactory jsonFactory = new JsonFactory();
        mapper = new ObjectMapper(jsonFactory);
        configuration = Configuration.defaultConfiguration().addOptions(Option.DEFAULT_PATH_LEAF_TO_NULL, Option.SUPPRESS_EXCEPTIONS);
    }

    @Test
    public void superimposeEncryptedDataOnOriginalNodeTest() throws IOException {
        JsonNode originalNode = mapper.readTree(REQUEST_INFO_NULL +
                ACTION_CREATE_REQUESTER_ID +
                AUTH_TOKEN_MALE +
                MOBILE_NUMBER_CITIZEN_PASSWORD_LAST);

        JsonNode encryptedNode = mapper.readTree("{\"User\":{\"userName\":\"123|jkafsdhkjhalfsj\",\"name\":\"123|" +
                "jkafsdhkjhalfsj\",\"mobileNumber\":\"123|hdskjahkjfk\"}}");

        JsonNode outputNode = JSONUtils.merge(encryptedNode, originalNode);

        JsonNode expectedNode = mapper.readTree(REQUEST_INFO_NULL +
                ACTION_CREATE_REQUESTER_ID +
                "\"auth_token\":null},\"User\":{\"userName\":\"123|jkafsdhkjhalfsj\"," +
                "\"name\":\"123|jkafsdhkjhalfsj\",\"gender\":\"male\",\"mobileNumber\":\"123|hdskjahkjfk\"," +
                "\"active\":true,\"type\":\"CITIZEN\",\"password\":\"password\"}}");

        assertEquals(expectedNode, outputNode);

    }


    @Test
    public void filterJsonNode() throws IOException {

        JsonNode originalNode = mapper.readTree(REQUEST_INFO_NULL +
                ACTION_CREATE_REQUESTER_ID +
                AUTH_TOKEN_MALE +
                MOBILE_NUMBER_CITIZEN_PASSWORD_LAST);

        List fieldsToBeEncrypted = Arrays.asList("userName", "name", "mobileNumber");

        JsonNode outputNode = JSONUtils.filterJsonNodeWithFields(originalNode, fieldsToBeEncrypted);

        JsonNode expectedNode = mapper.readTree("{\"User\":{\"userName\":\"ajay\",\"name\":\"ajay\"," +
                "\"mobileNumber\":\"12312312\"}}");

        assertEquals(expectedNode, outputNode);
    }

    @Test
    public void filterJsonNodeWithNoMatchingFields() throws IOException {
        JsonNode originalNode = mapper.readTree(REQUEST_INFO_NULL +
                ACTION_CREATE_REQUESTER_ID +
                AUTH_TOKEN_MALE +
                MOBILE_NUMBER_CITIZEN_PASSWORD_LAST);

        List fieldsToBeEncrypted = Arrays.asList();

        JsonNode outputNode = JSONUtils.filterJsonNodeWithFields(originalNode, fieldsToBeEncrypted);

        assertEquals(null, outputNode);

    }



    @Test
    public void checkIfAnyFieldExistsInJsonNode() throws IOException {
        JsonNode originalNode = mapper.readTree("{\"tenantDetails\":{\"tenantId\":\"pb.amritsar\"}," +
                "\"name\":{\"firstName\":\"Customer Name\"}}");
        List<String> fields = Arrays.asList("firstName");
        assertEquals(false, JSONUtils.checkIfNoFieldExistsInJsonNode(originalNode, fields));
    }

    @Test
    public void checkIfNoFieldExistsInJsonNode() throws IOException {
        JsonNode originalNode = mapper.readTree("{\"tenantDetails\":{\"tenantId\":\"pb.amritsar\"}," +
                "\"name\":{\"firstName\":\"Customer Name\"}}");
        List<String> fields = Arrays.asList("asd");
        assertEquals(true, JSONUtils.checkIfNoFieldExistsInJsonNode(originalNode, fields));
    }


    @Test
    public void filterWithGivenPaths() throws IOException {
        JsonNode originalNode = mapper.readTree(REQUEST_INFO_NULL +
                ACTION_CREATE_REQUESTER_ID +
                "\"auth_token\":null},\"User\":[{\"userName\":\"ajay\",\"name\":\"ajay\",\"gender\":\"male\"," +
                MOBILE_NUMBER_CITIZEN_PASSWORD +
                USER_NAME_MOBILE_NUMBER +
                ACTIVE_CITIZEN_PASSWORD);

        List<String> filterPaths = Arrays.asList("$.RequestInfo.api_id", "$.asd", "$.User.[*].name");

        ObjectMapper mapper = new ObjectMapper(new JsonFactory());

        JsonNode filteredNode = JSONUtils.filterJsonNodeWithPaths(originalNode, filterPaths);

        JsonNode expectednode = mapper.readTree("[\"1\", null, [\"ajay\",\"ajay\"]]");

        assertEquals(expectednode, filteredNode);
    }


    @Test
    public void mergeWithGivenPaths() throws IOException {
        JsonNode originalNode = mapper.readTree(REQUEST_INFO_NULL +
                ACTION_CREATE_REQUESTER_ID +
                "\"auth_token\":null},\"User\":[{\"userName\":\"ajay\",\"name\":\"ajay\",\"gender\":\"male\"," +
                MOBILE_NUMBER_CITIZEN_PASSWORD +
                USER_NAME_MOBILE_NUMBER +
                ACTIVE_CITIZEN_PASSWORD);

        List<String> filterPaths = Arrays.asList("$.RequestInfo.api_id", "$.asd", "$.User.[*].name");

        ObjectMapper mapper = new ObjectMapper(new JsonFactory());

        JsonNode encryptedNode = mapper.readTree("[\"EncValue\", null, [\"EncryptedName1\",\"EncryptedName2\"]]");

        JsonNode finalNode = JSONUtils.mergeNodesForGivenPaths(encryptedNode, originalNode, filterPaths);

        JsonNode expectedNode = mapper.readTree("{\"RequestInfo\":{\"api_id\":\"EncValue\",\"ver\":\"1\",\"ts\":null," +
                ACTION_CREATE_REQUESTER_ID +
                "\"auth_token\":null},\"User\":[{\"userName\":\"ajay\",\"name\":\"EncryptedName1\"," +
                "\"gender\":\"male\",\"mobileNumber\":\"12312312\",\"active\":true,\"type\":\"CITIZEN\"," +
                "\"password\":\"password\"},{\"userName\":\"ajay\",\"name\":\"EncryptedName2\",\"gender\":\"male\"," +
                "\"mobileNumber\":\"12312312\",\"active\":true,\"type\":\"CITIZEN\",\"password\":\"password\"}]}");

        assertEquals(expectedNode, finalNode);
    }

    @Test
    public void filterJsonNodeForPathTest() throws IOException {
        JsonNode jsonNode = mapper.readTree(REQUEST_INFO_NULL +
                ACTION_CREATE_REQUESTER_ID +
                "\"auth_token\":null},\"User\":[{\"userName\":\"ajay\",\"gender\":\"male\"," +
                MOBILE_NUMBER_CITIZEN_PASSWORD +
                USER_NAME_MOBILE_NUMBER +
                ACTIVE_CITIZEN_PASSWORD);

        JsonNode newNode = JSONUtils.filterJsonNodeWithPaths2(jsonNode, Arrays.asList("User/*/name", "RequestInfo" +
                "/api_id"));

        log.info(String.valueOf(newNode));
    }

}
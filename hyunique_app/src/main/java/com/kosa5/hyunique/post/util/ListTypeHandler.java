package com.kosa5.hyunique.post.util;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;
import org.apache.ibatis.type.TypeHandler;

import oracle.sql.ARRAY;
import oracle.sql.ArrayDescriptor;

@MappedTypes(java.util.ArrayList.class)
@MappedJdbcTypes(JdbcType.ARRAY)
public class ListTypeHandler implements TypeHandler {

    @Override
    public void setParameter(PreparedStatement ps, int i, Object param, JdbcType jdbcType) throws SQLException {
        List<?> objects = (List<?>) param;

        Object firstElement = objects.get(0);
        String typeName = null;

        if (firstElement instanceof Integer) {
            typeName = "TAGLIST";
        }
        else if (firstElement instanceof String) {
            typeName = "URLLIST";
        }

        ArrayDescriptor desc = ArrayDescriptor.createDescriptor(typeName, ps.getConnection());
        ARRAY oracleArray = new ARRAY(desc, ps.getConnection(), objects.toArray());
        ps.setArray(i, oracleArray);
    }

    @Override
    public List<String> getResult(ResultSet resultSet, String s) throws SQLException {
        ARRAY array = (ARRAY) resultSet.getArray(s);
        return array != null ? (List<String>) array.getArray() : new ArrayList<>();
    }

    @Override
    public List<String> getResult(ResultSet resultSet, int i) throws SQLException {
        ARRAY array = (ARRAY) resultSet.getArray(i);
        return array != null ? (List<String>) array.getArray() : new ArrayList<>();
    }

    @Override
    public List<String> getResult(CallableStatement callableStatement, int i) throws SQLException {
        ARRAY array = (ARRAY) callableStatement.getArray(i);
        return array != null ? (List<String>) array.getArray() : new ArrayList<>();
    }
}

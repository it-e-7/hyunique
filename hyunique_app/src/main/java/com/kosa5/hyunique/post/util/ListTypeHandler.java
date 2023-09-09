package com.kosa5.hyunique.post.util;

import com.kosa5.hyunique.post.vo.PostVO;
import oracle.sql.ARRAY;
import oracle.sql.ArrayDescriptor;
import oracle.sql.STRUCT;
import oracle.sql.StructDescriptor;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;
import org.apache.ibatis.type.TypeHandler;

import java.sql.*;
import java.util.List;

@MappedTypes(java.util.ArrayList.class)
@MappedJdbcTypes(JdbcType.ARRAY)
public class ListTypeHandler implements TypeHandler {

    @Override
    public void setParameter(PreparedStatement ps, int i, Object param, JdbcType jdbcType) throws SQLException {
        List<?> objects = (List<?>) param;

        Object firstElement = objects.get(0);
        String typeName = null;

        if (firstElement instanceof Integer) {
            typeName = "TAG_LIST";
        }
        else if (firstElement instanceof String) {
            typeName = "URL_LIST";
        }

        ArrayDescriptor desc = ArrayDescriptor.createDescriptor(typeName, ps.getConnection());
        ARRAY oracleArray = new ARRAY(desc, ps.getConnection(), objects.toArray());
        ps.setArray(i, oracleArray);
    }

    @Override
    public List getResult(ResultSet resultSet, String s) throws SQLException {
        return null;
    }

    @Override
    public List getResult(ResultSet resultSet, int i) throws SQLException {
        return null;
    }

    @Override
    public List getResult(CallableStatement callableStatement, int i) throws SQLException {
        return null;
    }
}

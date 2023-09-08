package com.kosa5.hyunique.post.util;


import com.kosa5.hyunique.post.vo.PostProductVO;
import oracle.sql.ARRAY;
import oracle.sql.ArrayDescriptor;
import oracle.sql.STRUCT;
import oracle.sql.StructDescriptor;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;
import org.apache.ibatis.type.TypeHandler;

import java.sql.*;
import java.util.Arrays;
import java.util.List;

@MappedTypes(java.util.ArrayList.class)
@MappedJdbcTypes(JdbcType.ARRAY)
public class PostProductTypeHandler implements TypeHandler {
    @Override
    public void setParameter(PreparedStatement ps, int i, Object param, JdbcType jdbcType) throws SQLException {
        List<PostProductVO> objects = (List<PostProductVO>) param;

        StructDescriptor structDescriptor = StructDescriptor.createDescriptor("POSTPRODUCTVO", ps.getConnection());

        STRUCT[] structs = new STRUCT[objects.size()];
        for (int idx=0; idx < objects.size(); idx++) {
            PostProductVO pack = objects.get(idx);
            Object[] params = new Object[4];
            params[0] = pack.getPinX();
            params[1] = pack.getPinY();
            params[2] = pack.getProductId();
            params[3] = pack.getProductSize();

            System.out.println("params = " + params.toString());

            STRUCT struct = new STRUCT(structDescriptor, ps.getConnection(), params);
            structs[idx] = struct;

            ArrayDescriptor desc = ArrayDescriptor.createDescriptor("POSTPRODUCTVOLIST", ps.getConnection());
            ARRAY oracleArray = new ARRAY(desc, ps.getConnection(), structs);
            System.out.println("oracleArray = " + Arrays.toString((Object[])oracleArray.getArray()));
            ps.setArray(i, oracleArray);
        }
    }

    @Override
    public Object getResult(ResultSet resultSet, String s) throws SQLException {
        return null;
    }

    @Override
    public Object getResult(ResultSet resultSet, int i) throws SQLException {
        return null;
    }

    @Override
    public Object getResult(CallableStatement callableStatement, int i) throws SQLException {
        return null;
    }
}

package com.kosa5.hyunique.post.util;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;
import org.apache.ibatis.type.TypeHandler;

import com.kosa5.hyunique.post.vo.PostVO;

import oracle.sql.STRUCT;
import oracle.sql.StructDescriptor;

@MappedTypes(STRUCT.class)
@MappedJdbcTypes(JdbcType.STRUCT)
public class PostTypeHandler implements TypeHandler {

    @Override
    public void setParameter(PreparedStatement ps, int i, Object obj, JdbcType jdbcType) throws SQLException {
        PostVO object = (PostVO) obj;
        StructDescriptor structDescriptor = StructDescriptor.createDescriptor("POSTVO", ps.getConnection());
        Object[] param = new Object[]{
                object.getPostContent(),
                object.getTpoId(),
                object.getSeasonId(),
                object.getUserId(),
                object.getThumbnailUrl()
        };

        STRUCT struct = new STRUCT(structDescriptor, ps.getConnection(), param);
        ps.setObject(i, struct, java.sql.Types.STRUCT);
    }

    @Override
    public PostVO getResult(ResultSet rs, String columnName) throws SQLException {
        return null;
    }

    @Override
    public PostVO getResult(ResultSet rs, int columnIndex) throws SQLException {
        return null;
    }

    @Override
    public PostVO getResult(CallableStatement cs, int columnIndex) throws SQLException {
        return null;

    }
}

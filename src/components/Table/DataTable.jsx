import { Table } from "antd";
import PropTypes from "prop-types";

export default function CustomDataTable(props) {
  const { data, columns, progressPending, rowSelection, pagination } = props;

  return (
    <Table
      // className="custom-datatable"
      // className="fit-content-columns"
      className="custom-table"
      columns={columns}
      dataSource={data}
      // pagination={(serverPagination && true) || false}
      highlightOnHover="true"
      pointerOnHover="true"
      rowSelection={rowSelection}
      pagination={pagination}
      // paginationServer={(serverPagination && true) || false}
      // paginationTotalRows={serverPagination?.totalRows}
      // onChangePage={(value) =>
      //   serverPagination?.updatePagination("pageNo", value)
      // }
      // onChangeRowsPerPage={(value) =>
      //   serverPagination?.updatePagination("size", value)
      // }
      // paginationPerPage={10}
      progressPending={progressPending}
    />
  );
}
CustomDataTable.propTypes = {
  data: PropTypes.node.isRequired,
  columns: PropTypes.node.isRequired,
  pagination: PropTypes.node.isRequired,
  progressPending: PropTypes.node,
  rowSelection: PropTypes.node,
};
CustomDataTable.defaultProps = {
  // serverPagination: null,
  progressPending: false,
  rowSelection: null,
};

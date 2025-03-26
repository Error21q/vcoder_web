import { Pagination, Spin, Table, TableProps } from "antd";
import { createStyles } from "antd-style";
import { IPagination } from "../../interfaces/pagination";
import { LoadingOutlined } from "@ant-design/icons";

const useStyle = createStyles(({ css, token }) => {
  const { antCls }: any = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

interface DataTableProps<RecordType>
  extends Omit<TableProps<RecordType>, "paginate"> {
  paginate?: IPagination;
  hideIndexColumn?: boolean;
}

const DataTable = <RecordType extends object>(
  props: DataTableProps<RecordType>
) => {
  const { styles } = useStyle();
  const { columns, dataSource, paginate, hideIndexColumn, ...restProps } =
    props;

  const indexColumn: any = {
    title: "#",
    width: "var(--Table-firstColumnWidth)",
    dataIndex: "index",
    key: "index",
    fixed: "left",
    render: (_: string, __: any, index: number) => {
      return (
        ((paginate?.current_page || 0) - 1) * (paginate?.page_size || 10) +
        index +
        1
      );
    },
  };

  return (
    <Table
      bordered
      className={styles.customTable}
      columns={hideIndexColumn ? columns : [indexColumn, ...(columns as any)]}
      dataSource={dataSource}
      pagination={false}
      scroll={{ x: "max-content" }}
      size="small"
      footer={() => (
        <Pagination
          showSizeChanger
          total={paginate?.total_items}
          showTotal={(_, range) =>
            `${range[0]}-${range[1]} of ${paginate?.total_items} items`
          }
          onChange={(page, pageSize) => {
            paginate?.onPageChange?.(page, pageSize);
          }}
        />
      )}
      loading={{ indicator: <Spin indicator={<LoadingOutlined spin />} /> }}
      {...restProps}
    />
  );
};

export default DataTable;

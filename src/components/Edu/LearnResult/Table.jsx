import { Table } from "flowbite-react";
import PropTypes from "prop-types";

export default function ScoreTable({ semesterData }) {
  console.log("ses: ", semesterData);
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Course Code</Table.HeadCell>
          <Table.HeadCell>Course Title</Table.HeadCell>
          <Table.HeadCell>Class code</Table.HeadCell>
          <Table.HeadCell>Credit</Table.HeadCell>
          <Table.HeadCell>Course Type</Table.HeadCell>
          <Table.HeadCell>Process Point</Table.HeadCell>
          <Table.HeadCell>Midterm</Table.HeadCell>
          <Table.HeadCell>Pracice Point</Table.HeadCell>
          <Table.HeadCell>Final score</Table.HeadCell>
          <Table.HeadCell>Credit Point</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y w-ful">
          {semesterData.score.map((subject, index) => {
            return (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800 w-full"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {subject.mamh}
                </Table.Cell>

                <Table.Cell>{subject.tenmh}</Table.Cell>
                <Table.Cell>{subject.malop}</Table.Cell>
                <Table.Cell>{subject.sotc}</Table.Cell>
                <Table.Cell>{subject.loaimh}</Table.Cell>
                <Table.Cell>{subject.diem}</Table.Cell>
                <Table.Cell>{subject.diem1}</Table.Cell>
                <Table.Cell>{subject.diem2}</Table.Cell>
                <Table.Cell>{subject.diem3}</Table.Cell>
                <Table.Cell>{subject.diem4}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}

ScoreTable.propTypes = {
  semesterData: PropTypes.object,
};

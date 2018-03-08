import React from "react";
import TableDragSelect from "react-table-drag-select";
import "./tablestyle.css";

class Scheduler extends React.Component {
  state = {
    cells: [
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false]
    ]
  };

  render = () =>
    <TableDragSelect
      value={this.state.cells}
      onChange={cells => this.setState({ cells })}
    >
              <tr>
              <td disabled />
              <td disabled>Monday</td>
              <td disabled>Tuesday</td>
              <td disabled>Wednesday</td>
              <td disabled>Thursday</td>
              <td disabled>Friday</td>
              <td disabled>Saturday</td>
              <td disabled>Sunday</td>
            </tr>
            <tr>
              <td disabled>3:00 PM</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td></td>
            </tr>
            <tr>
              <td disabled>4:00 PM</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td></td>
            </tr>
            <tr>
              <td disabled>5:00 PM</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td></td>
            </tr>
            <tr>
              <td disabled>6:00 PM</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td></td>
            </tr>
            <tr>
              <td disabled>7:00 PM</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td></td>
            </tr>
            <tr>
              <td disabled>8:00 PM</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td></td>
            </tr>
    </TableDragSelect>;
}

export default Scheduler;
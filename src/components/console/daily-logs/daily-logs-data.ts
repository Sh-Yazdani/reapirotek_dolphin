import type {MinimalTableData} from '@/components'

export const dailyLogsTableData: MinimalTableData = {
  title: 'Daily logs',
  header: [
    {text: 'Project', colSpan: 1},
    {text: 'Address', colSpan: 1},
    {text: 'Job Type', colSpan: 1},
    {text: 'Prepared By', colSpan: 1},
    {text: 'Date', colSpan: 1},
  ],
  rows: [
    {
      cells: [
        {text: 'Garage', colSpan: 1},
        {text: '123 Main St.', colSpan: 1},
        {text: 'Construction build', colSpan: 1},
        {text: 'Lus Godard', colSpan: 1},
        {text: '12/3/2023', colSpan: 1},
      ],
    },
    {
      cells: [{text: 'Weather', colSpan: 5, align: 'center', isHeader: true}],
    },
    {
      cells: [{text: 'Sunny, clear, mid-70s', colSpan: 5}],
    },
    {
      cells: [{text: 'Work', colSpan: 5, align: 'center', isHeader: true}],
    },
    {
      cells: [
        {text: 'Task', colSpan: 4, align: 'center', isSubHeader: true},
        {text: 'Status', colSpan: 1, align: 'center', isSubHeader: true},
      ],
    },
    {
      cells: [
        {text: 'Paint exterior', colSpan: 4},
        {text: 'Doing', colSpan: 1},
      ],
    },
    {
      cells: [
        {text: 'Remove vegetation near foundation', colSpan: 4},
        {text: 'Done', colSpan: 1},
      ],
    },
    {
      cells: [{text: 'Crew', colSpan: 5, align: 'center', isHeader: true}],
    },
    {
      cells: [
        {text: 'ID', colSpan: 1, align: 'center', isSubHeader: true},
        {text: 'Type', colSpan: 1, align: 'center', isSubHeader: true},
        {text: 'Name', colSpan: 2, align: 'center', isSubHeader: true},
        {text: 'Hours', colSpan: 1, align: 'center', isSubHeader: true},
      ],
    },
    {
      cells: [
        {text: '1', colSpan: 1},
        {text: 'Painter', colSpan: 1},
        {text: 'Joe Smith', colSpan: 2},
        {text: '5', colSpan: 1},
      ],
    },
    {
      cells: [
        {text: '2', colSpan: 1},
        {text: 'Painter', colSpan: 1},
        {text: 'Sam Jone', colSpan: 2},
        {text: '8', colSpan: 1},
      ],
    },
    {
      cells: [
        {text: '3', colSpan: 1},
        {text: 'Landscaper', colSpan: 1},
        {text: 'Jak Saley', colSpan: 2},
        {text: '7', colSpan: 1},
      ],
    },
    {
      cells: [{text: 'Equipment', colSpan: 5, align: 'center', isHeader: true}],
    },
    {
      cells: [
        {text: 'ID', colSpan: 1, align: 'center', isSubHeader: true},
        {text: 'Type', colSpan: 2, align: 'center', isSubHeader: true},
        {text: 'Status', colSpan: 1, align: 'center', isSubHeader: true},
        {text: 'Hours', colSpan: 1, align: 'center', isSubHeader: true},
      ],
    },
    {
      cells: [
        {text: '1', colSpan: 1},
        {text: 'Paint blower', colSpan: 2},
        {text: 'in use', colSpan: 1},
        {text: '5', colSpan: 1},
      ],
    },
    {
      cells: [
        {text: '2', colSpan: 1},
        {text: 'Brushes, rollers', colSpan: 2},
        {text: 'in use', colSpan: 1},
        {text: '9', colSpan: 1},
      ],
    },
    {
      cells: [
        {text: '3', colSpan: 1},
        {text: 'Pick, shovers', colSpan: 2},
        {text: 'in use', colSpan: 1},
        {text: '7', colSpan: 1},
      ],
    },
    {
      cells: [{text: 'Materials', colSpan: 5, align: 'center', isHeader: true}],
    },
    {
      cells: [
        {text: 'ID', colSpan: 1, align: 'center', isSubHeader: true},
        {text: 'Type', colSpan: 1, align: 'center', isSubHeader: true},
        {text: 'Used', colSpan: 1, align: 'center', isSubHeader: true},
        {text: 'Remaining', colSpan: 2, align: 'center', isSubHeader: true},
      ],
    },
    {
      cells: [
        {text: '1', colSpan: 1},
        {text: 'paint', colSpan: 1},
        {text: 'Yes', colSpan: 1},
        {text: '3 gallons', colSpan: 2},
      ],
    },
    {
      cells: [
        {text: '2', colSpan: 1},
        {text: 'Trap', colSpan: 1},
        {text: 'Yes', colSpan: 1},
        {text: '30 sq. ft.', colSpan: 2},
      ],
    },
    {
      cells: [
        {text: '3', colSpan: 1},
        {text: 'Pick, shovers', colSpan: 1},
        {text: 'in use', colSpan: 1},
        {text: '30 sq. ft.', colSpan: 2},
      ],
    },
    {
      cells: [{text: 'Delivered', colSpan: 5, align: 'center', isHeader: true}],
    },
    {
      cells: [
        {text: 'ID', colSpan: 1, align: 'center', isSubHeader: true},
        {text: 'Type', colSpan: 2, align: 'center', isSubHeader: true},
        {text: 'Scheduled', colSpan: 1, align: 'center', isSubHeader: true},
        {text: 'Actual', colSpan: 1, align: 'center', isSubHeader: true},
      ],
    },
    {
      cells: [
        {text: '1', colSpan: 1},
        {text: 'paint', colSpan: 2},
        {text: '8:00 AM', colSpan: 1},
        {text: '8:30 AM', colSpan: 1},
      ],
    },
    {
      cells: [
        {text: '2', colSpan: 1},
        {text: 'Trap', colSpan: 2},
        {text: 'Yes', colSpan: 1},
        {text: '30 sq. ft.', colSpan: 1},
      ],
    },
    {
      cells: [
        {text: '3', colSpan: 1},
        {text: 'Pick, shovers', colSpan: 2},
        {text: 'in use', colSpan: 1},
        {text: '30 sq. ft.', colSpan: 1},
      ],
    },
    {
      cells: [{text: 'Delays', colSpan: 5, align: 'center', isHeader: true}],
    },
    {
      cells: [
        {text: 'ID', colSpan: 1, align: 'center', isSubHeader: true},
        {text: 'Type', colSpan: 1, align: 'center', isSubHeader: true},
        {text: 'Description', colSpan: 2, align: 'center', isSubHeader: true},
        {text: 'Time', colSpan: 1, align: 'center', isSubHeader: true},
      ],
    },
    {
      cells: [
        {text: '1', colSpan: 1},
        {text: 'Paint delivery', colSpan: 1},
        {text: 'Paint come half an hour after expected', colSpan: 2},
        {text: 'half-hours', colSpan: 1},
      ],
    },
    {
      cells: [{text: 'Issue', colSpan: 5, align: 'center', isHeader: true}],
    },
    {
      cells: [
        {text: 'ID', colSpan: 1, align: 'center', isSubHeader: true},
        {text: 'Type', colSpan: 1, align: 'center', isSubHeader: true},
        {text: 'Description', colSpan: 2, align: 'center', isSubHeader: true},
        {text: 'Time', colSpan: 1, align: 'center', isSubHeader: true},
      ],
    },
    {
      cells: [
        {text: '1', colSpan: 1},
        {text: 'Paint delivery', colSpan: 1},
        {text: 'Well done', colSpan: 2},
        {text: 'half-hours', colSpan: 1},
      ],
    },
    {
      cells: [
        {
          text: 'Employee accident',
          colSpan: 5,
          align: 'center',
          isHeader: true,
        },
      ],
    },
    {
      cells: [
        {text: 'ID', colSpan: 1, align: 'center', isSubHeader: true},
        {text: 'Type', colSpan: 1, align: 'center', isSubHeader: true},
        {text: 'Description', colSpan: 2, align: 'center', isSubHeader: true},
        {text: 'Time', colSpan: 1, align: 'center', isSubHeader: true},
      ],
    },
    {
      cells: [
        {text: '1', colSpan: 1},
        {text: 'Paint delivery', colSpan: 1},
        {text: 'Well done', colSpan: 2},
        {text: '12:18', colSpan: 1},
      ],
    },
    {
      cells: [
        {text: 'Equipment damage', colSpan: 5, align: 'center', isHeader: true},
      ],
    },
    {
      cells: [
        {text: 'ID', colSpan: 1, align: 'center', isSubHeader: true},
        {text: 'Type', colSpan: 1, align: 'center', isSubHeader: true},
        {text: 'Description', colSpan: 2, align: 'center', isSubHeader: true},
        {text: 'Time', colSpan: 1, align: 'center', isSubHeader: true},
      ],
    },
    {
      cells: [
        {text: '1', colSpan: 1},
        {text: 'Bolduzer', colSpan: 1},
        {text: 'Well done', colSpan: 2},
        {text: '13:20', colSpan: 1},
      ],
    },
  ],
}

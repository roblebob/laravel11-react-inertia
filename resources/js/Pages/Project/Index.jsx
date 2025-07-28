import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP} from "@/constant.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import TextInput from "@/Components/TextInput.jsx";

export default function Index({auth, projects, queryParams = null}) {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (name) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route('project.index'), queryParams);
  };
  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      // Toggle sort direction
      queryParams.sort_direction = queryParams.sort_direction === 'asc' ? 'desc' : 'asc';
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = 'asc'; // Default to ascending if a new field is sorted
    }

    router.get(route('project.index'), queryParams);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Projects
        </h2>
      }
    >
      <Head title="Projects"/>

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">

              {/*<pre>{JSON.stringify(projects, undefined, 2)}</pre>*/}


              <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead
                  className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-500 dark:border-gray-600"
                >
                <tr className="text-no-wrap">
                  <th onClick={(e) => sortChanged('id')}
                      className={"whitespace-nowrap px-3 py-3 " + (queryParams.sort_field === 'id' ? 'text-white' : '')}>
                    ID {queryParams.sort_field === 'id' ? (queryParams.sort_direction === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th className="text-gray-500 px-3 py-3 w-[100px]">Image
                  </th>
                  <th onClick={(e) => sortChanged('name')}
                      className={"whitespace-nowrap px-3 py-3 " + (queryParams.sort_field === 'name' ? 'text-white' : '')}>
                    Name {queryParams.sort_field === 'name' ? (queryParams.sort_direction === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th onClick={(e) => sortChanged('status')}
                      className={"whitespace-nowrap px-3 py-3 " + (queryParams.sort_field === 'status' ? 'text-white' : '')}>
                    Status {queryParams.sort_field === 'status' ? (queryParams.sort_direction === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th onClick={(e) => sortChanged('created_at')}
                      className={"whitespace-nowrap px-3 py-3 " + (queryParams.sort_field === 'created_at' ? 'text-white' : '')}>
                    Create
                    Date {queryParams.sort_field === 'created_at' ? (queryParams.sort_direction === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th onClick={(e) => sortChanged('due_date')}
                      className={"whitespace-nowrap px-3 py-3 " + (queryParams.sort_field === 'due_date' ? 'text-white' : '')}>
                    Due
                    Date {queryParams.sort_field === 'due_date' ? (queryParams.sort_direction === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th className="text-gray-500 px-3 py-3 whitespace-nowrap">Created By</th>
                  <th className="text-gray-500 px-3 py-3 text-right">Actions</th>
                </tr>
                </thead>

                <thead
                  className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-500 dark:border-gray-600"
                >
                <tr className="text-no-wrap">
                  <th className="px-3 py-3"></th>
                  <th className="px-3 py-3 w-[100px]"></th>
                  <th className="px-3 py-3">
                    <TextInput
                      className="w-full"
                      defaultValue={queryParams.name}
                      placeholder="Project Name"
                      onBlur={(e) => searchFieldChanged('name', e.target.value)}
                      onKeyPress={(e) => onKeyPress('name', e)}
                    />
                  </th>
                  <th className="px-3 py-3">
                    <SelectInput
                      className="w-full"
                      defaultValue={queryParams.status}
                      onChange={(e) => searchFieldChanged('status', e.target.value)}
                    >
                      <option value="">Select Status</option>
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </SelectInput>
                  </th>
                  <th className="px-3 py-3"></th>
                  <th className="px-3 py-3"></th>
                  <th className="px-3 py-3"></th>
                  <th className="px-3 py-3"></th>
                </tr>
                </thead>


                <tbody>
                {projects.data.map(project => (
                  <tr key={project.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="border px-4 py-2">{project.id}</td>
                    <td className="border px-4 py-2 w-[100px]"><img src={project.image_path}
                                                                    style={{width: '100px', height: 'auto'}}
                                                                    alt=""/></td>
                    <td className="border px-4 py-2 truncate">{project.name}</td>
                    <td
                      className="border px-4 py-2">
                      <span className={"px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status]}>
                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                      </span>
                    </td>
                    <td className="border px-4 py-2 text-nowrap">{project.created_at}</td>
                    <td className="border px-4 py-2 text-nowrap">{project.due_date}</td>
                    <td className="border px-4 py-2 whitespace-nowrap">{project.createdBy.name}</td>
                    <td className="border px-4 py-2 text-right">
                      <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                            href={route('project.edit', project.id)}>Edit</Link>
                      <Link className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                            href={route('project.destroy', project.id)}>Delete</Link>
                    </td>
                  </tr>
                ))}

                </tbody>
              </table>

              <Pagination links={projects.meta.links}/>

            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  )
}

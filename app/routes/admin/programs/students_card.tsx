import { StandardContainer } from "~/components/site/standard_container";

type StudentInfo = {
  firstName: string;
  lastName: string;
  school: string;
};

export default function StudentsCard({
  students
}: {
  students: StudentInfo[];
}) {
  return (
    <StandardContainer>
      <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg mt-6">
        <div className="px-4 py-6 sm:px-6">
          <h3 className="text-base/7 font-semibold text-gray-900">
            Students
          </h3>
          <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
            List of students associated with this application.
          </p>
        </div>
        <div className="border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            {students.length === 0 ? (
              <div className="px-4 py-6 sm:px-6 text-gray-500">No students found.</div>
            ) : (
              students.map((student, idx) => (
                <div
                  key={idx}
                  className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                >
                  <dt className="text-sm font-medium text-gray-900">Full name</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {student.firstName} {student.lastName}
                  </dd>
                  <dt className="text-sm font-medium text-gray-900">School</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {student.school}
                  </dd>
                </div>
              ))
            )}
          </dl>
        </div>
      </div>
    </StandardContainer>
  );
}

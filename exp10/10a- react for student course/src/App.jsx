import { useState } from 'react';

const initialCourses = [
  {
    id: 1,
    name: 'Web Development',
    code: 'CSW101',
    instructor: 'Ms. Priya',
    credits: '4',
    description: 'Basics of HTML, CSS, JavaScript, and responsive layouts.'
  },
  {
    id: 2,
    name: 'Database Systems',
    code: 'CSD204',
    instructor: 'Mr. Arun',
    credits: '3',
    description: 'Tables, queries, and database basics.'
  }
];

function App() {
  const [courses, setCourses] = useState(initialCourses);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    instructor: '',
    credits: '',
    description: ''
  });
  const [editingId, setEditingId] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function resetForm() {
    setFormData({
      name: '',
      code: '',
      instructor: '',
      credits: '',
      description: ''
    });
    setEditingId(null);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextCourse = {
      id: editingId ?? Date.now(),
      name: formData.name.trim(),
      code: formData.code.trim(),
      instructor: formData.instructor.trim(),
      credits: formData.credits.trim(),
      description: formData.description.trim()
    };

    if (!nextCourse.name || !nextCourse.code || !nextCourse.instructor || !nextCourse.credits) {
      return;
    }

    setCourses((current) => {
      if (editingId) {
        return current.map((course) => (course.id === editingId ? nextCourse : course));
      }
      return [nextCourse, ...current];
    });

    resetForm();
  }

  function handleEdit(course) {
    setEditingId(course.id);
    setFormData({
      name: course.name,
      code: course.code,
      instructor: course.instructor,
      credits: course.credits,
      description: course.description
    });
  }

  function handleDelete(id) {
    setCourses((current) => current.filter((course) => course.id !== id));
    if (editingId === id) {
      resetForm();
    }
  }

  return (
    <main className="page">
      <section className="shell">
        <h1>Student course registrations</h1>
        <p className="lead">Add, update, and view course details.</p>

        <div className="layout">
          <div className="panel">
            <h2>{editingId ? 'Update course' : 'Add course'}</h2>
            <form className="form-grid" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Course name</label>
                <input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Web Development" />
              </div>
              <div>
                <label htmlFor="code">Course code</label>
                <input id="code" name="code" value={formData.code} onChange={handleChange} placeholder="e.g. CS101" />
              </div>
              <div>
                <label htmlFor="instructor">Instructor</label>
                <input id="instructor" name="instructor" value={formData.instructor} onChange={handleChange} placeholder="e.g. Ms. Rao" />
              </div>
              <div>
                <label htmlFor="credits">Credits</label>
                <input id="credits" name="credits" value={formData.credits} onChange={handleChange} placeholder="e.g. 4" />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Short course notes"></textarea>
              </div>
              <div className="actions">
                <button className="primary" type="submit">{editingId ? 'Update course' : 'Add course'}</button>
                <button className="secondary" type="button" onClick={resetForm}>Clear</button>
              </div>
              <small className="hint">All fields except description are required.</small>
            </form>
          </div>

          <div className="panel">
            <h2>Registered courses</h2>
            <div className="course-list">
              {courses.length === 0 ? (
                <p className="empty">No courses added yet.</p>
              ) : (
                courses.map((course) => (
                  <article className="course-card" key={course.id}>
                    <header>
                      <div>
                        <h3>{course.name}</h3>
                        <small>{course.code} • {course.credits} credits</small>
                      </div>
                      <div className="inline-actions">
                        <button type="button" className="secondary" onClick={() => handleEdit(course)}>Edit</button>
                        <button type="button" className="secondary" onClick={() => handleDelete(course.id)}>Delete</button>
                      </div>
                    </header>
                    <p>{course.description || 'No description added.'}</p>
                    <div className="meta">Instructor: {course.instructor}</div>
                  </article>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;

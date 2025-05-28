import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to the Faculty of Computing, Engineering and Media
          </h1>
          <h2 className="text-2xl text-gray-600">
            De Montfort University Kazakhstan (DMUK)
          </h2>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <p className="text-lg text-gray-700 mb-6">
            Our mission is to provide students with a world-class education in computing, engineering, and media disciplines—right here in Almaty. We offer British-accredited degrees supported by modern teaching practices, project-based learning, and expert instructors.
          </p>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Preparing Future Tech Leaders
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              DMUK students are prepared to meet the evolving demands of the global tech industry through:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Practical, hands-on coursework</li>
              <li>A curriculum aligned with international standards</li>
              <li>Close collaboration with faculty and peers</li>
              <li>Access to current technologies and tools</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-lg text-gray-700">
              Whether your interest lies in software development, cybersecurity, data science, or digital innovation, our programs are designed to equip you with both the technical and soft skills needed to succeed.
            </p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Have Questions?
          </h3>
          <p className="text-lg text-gray-700">
            Our administrative and academic teams are available to provide guidance on admissions, course offerings, and student support services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About; 
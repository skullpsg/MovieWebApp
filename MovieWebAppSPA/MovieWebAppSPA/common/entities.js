MovieAppSPA.value("trim", jQuery.trim);
MovieAppSPA.factory(
    "BladeModel",
     ["trim", function (trim) {
         // Define the constructor function.
         function BladeModel(templates, controller, title, width, callback, actionText, data, excludedFooterElements, instanceId) {
             this.Title = trim(title || "");
             this.Templates = (templates == undefined || templates.length == 0) ? [] : templates;
             this.Controller = trim(controller || "");
             this.Width = trim(width || "");
             this.Callback = callback;
             this.ActionText = trim(actionText || "");
             this.Data = trim(data || "");
             this.ExcludedFooterElements = trim(excludedFooterElements || "")
             this.InstanceId = trim(instanceId || "")
         }
         // Return constructor - this is what defines the actual
         // injectable in the DI framework.
         return (BladeModel);
     }
     ]);

MovieAppSPA.factory(
    "Student",
     ["trim", function (trim) {
         // Define the constructor function.
         function Student(id, name, title, address, sex, courseId) {
             this.Id = trim(id || "");
             this.Name = trim(name || "");
             this.Address = trim(address || "");
             this.Sex = sex;
             this.CourseId = trim(courseId || "");
         }
         // Return constructor - this is what defines the actual
         // injectable in the DI framework.
         return (Student);
     }
     ]);

MovieAppSPA.factory(
    "Movie",
     ["trim", function (trim) {
         // Define the constructor function.
         function Student(id, runtime, genre, language, imdbRating, title, year) {
             this.Id = trim(id || "");
             this.Runtime = trim(runtime || "");
             this.Genre = trim(genre || "");
             this.imdbRating = trim(imdbRating || "");
             this.Language = trim(language || "");
             this.Title = trim(title || "");
             this.Year = trim(year || "");

         }
         // Return constructor - this is what defines the actual
         // injectable in the DI framework.
         return (Student);
     }
     ]);


MovieAppSPA.factory(
    "Course",
     ["trim", function (trim) {
         // Define the constructor function.
         function Course(id, name, credit, universityId) {
             this.Id = trim(id || "");
             this.Name = trim(name || "");
             this.Credit = trim(credit || "");
             this.UniversityId = trim(universityId || "");
         }
         // Return constructor - this is what defines the actual
         // injectable in the DI framework.
         return (Course);
     }
     ]);

MovieAppSPA.factory(
    "University",
     ["trim", function (trim) {
         // Define the constructor function.
         function University(id, name, rank, width, country) {
             this.Id = trim(id || "");
             this.Name = trim(name || "");
             this.Rank = trim(rank || "");
             this.Country = trim(country || "");
         }
         // Return constructor - this is what defines the actual
         // injectable in the DI framework.
         return (University);
     }
     ]);
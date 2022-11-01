package LA2Q2;

public class StudentGrade implements Comparable<StudentGrade>{
    //private data fields declared
    private String firstName;
    private String lastName;
    private int grade;
    //constructor with no parameters and empty body
    public StudentGrade(){}
    //constructor with parameters assigning them to the data fields
    public StudentGrade(String firstName, String lastName, int grade){
        this.grade = grade;
        this.firstName = firstName;
        this.lastName= lastName;
    }
    //setter methods
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public void setGrade(Integer grade) {
        this.grade = grade;
    }
    //getter methods
    public Integer getGrade() {
        return grade;
    }
    public String getFirstName() {
        return firstName;
    }
    public String getLastName() {
        return lastName;
    }
    //overridden toString method that is used the print the arrays in the driver
    @Override
    public String toString() {
        return this.firstName + " " + this.lastName + "  :    " + this.grade+"\n";
    }
    //implementing compareTo method that compares the grades of the students
    @Override
    public int compareTo(StudentGrade o) {
        return 0;
    }
}

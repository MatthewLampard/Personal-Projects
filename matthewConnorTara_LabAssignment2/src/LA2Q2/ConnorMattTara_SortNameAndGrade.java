package LA2Q2;

import java.util.Collections;
import java.util.Comparator;
import java.util.Vector;

public class ConnorMattTara_SortNameAndGrade {
    public static void main(String[] args){
        //Header method
        printHeader();
        //arrays created for us to use
        String[] fnArray = {"Hermione", "Ron", "Harry", "Luna", "Ginny",
                "Draco", "Dean", "Fred"};
        String[] lnArray = {"Granger", "Weasley", "Potter", "Lovegood",
                "Weasley", "Malfoy", "Thomas", "Weasley"};
        Integer[] grd = {(int)(60 + Math.random()*26),(int)(60 +
                Math.random()*26),(int)(60 + Math.random()*26),(int)(60 +
                Math.random()*26),(int)(60 + Math.random()*26),(int)(60 +
                Math.random()*26),(int)(60 + Math.random()*26),(int)(60 +
                Math.random()*26)};

        //new StudentGrade objects are instantiated using the elements from the array above
        StudentGrade stuGrd1 = new StudentGrade(fnArray[0], lnArray[0], grd[0]);
        StudentGrade stuGrd2 = new StudentGrade(fnArray[1], lnArray[1], grd[1]);
        StudentGrade stuGrd3 = new StudentGrade(fnArray[2], lnArray[2], grd[2]);
        StudentGrade stuGrd4 = new StudentGrade(fnArray[3], lnArray[3], grd[3]);
        StudentGrade stuGrd5 = new StudentGrade(fnArray[4], lnArray[4], grd[4]);
        StudentGrade stuGrd6 = new StudentGrade(fnArray[5], lnArray[5], grd[5]);
        StudentGrade stuGrd7 = new StudentGrade(fnArray[6], lnArray[6], grd[6]);
        StudentGrade stuGrd8 = new StudentGrade(fnArray[7], lnArray[7], grd[7]);
        //a vector object is instantiated with a StudentGrade tag
        Vector<StudentGrade> sg = new Vector<>();
        //each StudentGrade object is added as an element to the vector
        sg.addElement(stuGrd1);
        sg.addElement(stuGrd2);
        sg.addElement(stuGrd3);
        sg.addElement(stuGrd4);
        sg.addElement(stuGrd5);
        sg.addElement(stuGrd6);
        sg.addElement(stuGrd7);
        sg.addElement(stuGrd8);

        //calling toString method from LA2Q2.StudentGrade class to print the unsorted array
        System.out.println("\nThe Unsorted Array............");
        for(int i=0; i<sg.size(); i++)
            System.out.print(sg.elementAt(i).toString());
        //the vector is sorted using Collections.sort
        Collections.sort(sg, Comparator.comparingInt(StudentGrade::getGrade));
        //sorted array is printed
        System.out.println("\nSorted Array.........");
        for(int i=0; i<sg.size(); i++)
            System.out.print(sg.elementAt(i).toString());
        //a StudentGrade type array is created with the same size as the fnArray
        StudentGrade[] stuGrdArr = new StudentGrade[fnArray.length];
        //the elements of the vector are copied into the array
        sg.copyInto(stuGrdArr);
        //the array is sorted alphabetically according to first name using the insertion sort method
        insertionSort(stuGrdArr,1);
        //the sorted array is printed
        System.out.println("\nSorted by first name:");
        for(int i=0; i<stuGrdArr.length; i++)
            System.out.print(stuGrdArr[i].toString());
        //the array is sorted alphabetically according to last name using the insertion sort method
        insertionSort(stuGrdArr,2);
        //the sorted array is printed
        System.out.println("\nSorted by last name:");
        for(int i=0; i<stuGrdArr.length; i++)
            System.out.print(stuGrdArr[i].toString());
        //the footer is printed
        printFooter();
    }
    //the method that will sort the array according to first and last names
    public static < T extends Comparable <? super T >> void insertionSort(StudentGrade[] list, int key){
        //if the key is 1 sort according to first name
        if(key==1) {
            for(int i=1;i<list.length;i++){
                StudentGrade k = list[i];
                //the first char of the first name of each element is compared
                for(int j=i-1; j>=0 && list[j].getFirstName().charAt(0) > k.getFirstName().charAt(0);j--){
                    list[j+1]=list[j];
                    list[j] = k;
                }
            }
        }
        //if the key is 2 sort according to last name
        if(key==2) {
            for(int i=1;i<list.length;i++){
                StudentGrade k = list[i];
                //the first char of the last name of each element is compared
                for(int j=i-1; j>=0 && list[j].getLastName().charAt(0) > k.getLastName().charAt(0);j--){
                    list[j+1]=list[j];
                    list[j] = k;
                }
            }
        }
    }
    //header method
    public static void printHeader(){
        for (int stars=0; stars<40; stars++)
            System.out.print("*");
        System.out.println("\nNames: Matthew Lampard, Connor Pribaz, Tara Lee\n" +  "Student Numbers: 251136834, 251146903, 251141805\nGoal " +
                "of this project: To test the time of sorting methods");
        for (int stars=0; stars<40; stars++)
            System.out.print("*");
        System.out.println();
    }
    //footer method
    public static void printFooter(){
        for (int stars=0; stars<50; stars++)
            System.out.print("*");
        System.out.println();
        System.out.println("This is the time of day: " + java.time.LocalTime.now() + " on "+ java.time.LocalDate.now());
        System.out.println("Completion of Lab Assignment 2 is successful!");
        System.out.println("Goodbye! From Tara lee, Matthew Lampard, Connor Pribaz");
        for (int stars=0; stars<50; stars++)
            System.out.print("*");
    }
}
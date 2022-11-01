package LA2Q1;

import java.util.*;
import java.util.concurrent.TimeUnit;

public class TaraMatthewConnorTestingSortingMethods {
    //the selection sort method
    public static <T extends Comparable <? super T>>long selectionSort (T [] a){
        for(int i=0;i<a.length-1;i++){
            int iSmallest =i;
            for(int j=i+1;j<a.length;j++){
                if(a[iSmallest].compareTo(a[j])<0){
                    iSmallest=j;
                }
            }
            T temp = a[i];
            a[i]=a[iSmallest];
            a[iSmallest]=temp;
        }
        return -1;
    }
    //bubble sort method
    public static < T extends Comparable <? super T >> long bubbleSort(T[] a){
        for( int i=1;i<a.length;i++){
            for(int j=0;j<a.length;j++){
                if(a[j].compareTo(a[i])<0){
                    T temp= a[j];
                    a[j]=a[i];
                    a[i]=temp;
                }
            }
        }
        return -1;
    }
    //insertion sort method
    public static < T extends Comparable <? super T >> long insertionSort(T[] a){
        for(int i=1;i<a.length;i++){
            T key= a[i];
            for(int j=i-1; j>=0 && a[j].compareTo(key)<0 ;j--){
                a[j+1]=a[j];
                a[j]=key;
            }
        }
        return -1;
    }
    //merge sort method
    public static <T extends Comparable<? super T>> long mergeSort(T[] S){
        int n= S.length;
        if (n<2) return -1;

        int mid=n/2;
        T[] S1 = Arrays.copyOfRange(S,0,mid);
        T[] S2 = Arrays.copyOfRange(S,mid,n);

        mergeSort(S1);
        mergeSort(S2);

        int i=0; int j=0;
        while (i + j < S.length) {
            if (j == S2.length || (i < S1.length && S1[i].compareTo(S2[j]) < 0))
                S[i+j] = S1[i++]; // copy ith element of S1 and
        else
            S[i+j] = S2[j++]; // copy jth element of S2 and
        }

        return -1;
    }
    //quick sort method
    public static <T extends Comparable<? super T>> long quickSort(T[] s, int a, int b){
      if (a>=b) return -1;
      int left =a;
      int right =b-1;
      T pivot = s[b];
      T temp;
      while(left<=right){
          while (left<=right && s[left].compareTo(pivot)<0){
              left++;
          }
          while(left<= right && s[right].compareTo(pivot)>0){
              right--;
          }
          if(left<=right){
              temp = s[left];
              s[left]=s[right];
              s[right]=temp;
              left++; right--;
          }
      }
      temp =s[left];
      s[left] = s[b];
      s[b]=temp;
      quickSort(s,a,left-1);
      quickSort(s,left+1,b);
      return -1;
    }
    //header method
    public static void printHeader(){
        for (int stars=0; stars<50; stars++)
            System.out.print("*");
        System.out.println("\nNames: Matthew Lampard, Connor Pribaz, Tara Lee\n" +  "Student Numbers: 251136834, 251146903, 251141805\nGoal " +
                "of this project: To test the time of sorting methods");
        for (int stars=0; stars<50; stars++)
            System.out.print("*");
        System.out.println("\n");
    }
    //footer method
    public static void printFooter(){
        System.out.println();
        for (int stars=0; stars<50; stars++)
            System.out.print("*");
        System.out.println();
        System.out.println("This is the time of day: " + java.time.LocalTime.now() + " on "+ java.time.LocalDate.now());
        System.out.println("Completion of Lab Assignment 2 is successful!");
        System.out.println("Goodbye! From Tara lee, Matthew Lampard, Connor Pribaz");
        for (int stars=0; stars<50; stars++)
            System.out.print("*");
    }
    public static void main(String[] args) {
        //call header method
        printHeader();
        //arrays are created with sizes of 50000
        Integer[] array = new Integer[50000];
        Integer[] backup = new Integer[50000];

        for(int i=0;i<array.length;i++){
            array[i]= (int)(Math.random()*50000);} //populating array with random numbers

        //copying elements of array to backup array
        System.arraycopy(array,0,backup,0,backup.length);

        //converting original array into an arrayList
        List<Integer> arraylist = Arrays.asList(array);

        //sorting array list and timing it
        long startTime = System.nanoTime();
        Collections.sort(arraylist);
        long endTime = System.nanoTime();
        long collectionsduration = (endTime - startTime);
        long durationInMillis = TimeUnit.NANOSECONDS.toMillis(collectionsduration);
        System.out.println("Duration of Collections Sort: " + durationInMillis + " milliseconds");

        //copying backup array back to array
        System.arraycopy(backup,0,array,0,backup.length);

        //calling selection
        long selectstartTime = System.nanoTime();
        selectionSort(array);
        long selectendTime = System.nanoTime();
        long selectduration = (selectendTime - selectstartTime);
        long selectinMillis = TimeUnit.NANOSECONDS.toMillis(selectduration);
        System.out.println("Duration of Selection Sort: " + selectinMillis + " milliseconds");
        //copying backup array back to array
        System.arraycopy(backup,0,array,0,backup.length);

        //calling bubble
        long bubblestartTime = System.nanoTime();
        bubbleSort(array);
        long bubbleendTime = System.nanoTime();
        long bubbleduration = (bubbleendTime - bubblestartTime);
        long bubbleinMillis = TimeUnit.NANOSECONDS.toMillis(bubbleduration);
        System.out.println("Duration of Bubble Sort: " + bubbleinMillis + " milliseconds");
        //copying backup array back to array
        System.arraycopy(backup,0,array,0,backup.length);

        //calling insertion sort
        long insertstartTime = System.nanoTime();
        insertionSort(array);
        long insertendTime = System.nanoTime();
        long insertduration = (insertendTime - insertstartTime);
        long insertinMillis = TimeUnit.NANOSECONDS.toMillis(insertduration);
        System.out.println("Duration of Insertion Sort: " + insertinMillis + " milliseconds");
        //copying backup array back to array
        System.arraycopy(backup,0,array,0,backup.length);

        //calling merge sort
        long mergeStartTime = System.nanoTime();
        mergeSort(array);
        long mergeEndTime = System.nanoTime();
        long mergeDuration = (mergeEndTime - mergeStartTime);
        long mergeInMillis = TimeUnit.NANOSECONDS.toMillis(mergeDuration);
        System.out.println("Duration of Merge Sort: " + mergeInMillis + " milliseconds");
        //copying backup array back to array
        System.arraycopy(backup,0,array,0,backup.length);

        //calling quickstart
        long quickstartTime = System.nanoTime();
        quickSort(array,0, array.length-1);
        long quickEndTime = System.nanoTime();
        long quickDuration = (quickEndTime - quickstartTime);
        long quickInMillis = TimeUnit.NANOSECONDS.toMillis(quickDuration);
        System.out.println("Duration of Quick Sort: " + quickInMillis + " milliseconds");

        printFooter();

    }



}

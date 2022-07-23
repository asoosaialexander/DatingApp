using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class StringExtensions
    {
        public static string FirstLetterCapsInWords(this string text)
        {
            string[] arr = text.Split(' ');
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < arr.Count(); i++)
            {
                sb.Append(arr[i][0].ToString().ToUpper());
                sb.Append(arr[i].ToLower().Substring(1));
                sb.Append(' ');
            }

            return sb.ToString();
        }
    }
}
package com.bandtec.searchdevelopers.activities.ui.favorite

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import com.bandtec.searchdevelopers.R
import com.bandtec.searchdevelopers.databinding.FragmentConfigurationBinding

private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"


class FavoriteFragment : Fragment() {

    private var _binding: FragmentConfigurationBinding? = null
    private val binding get() = _binding!!

    private var param1: String? = null
    private var param2: String? = null

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val favoriteClick: ImageView = view.findViewById(R.id.rate_user_favorite)

        favoriteClick.setOnClickListener{
            favoriteClick.setImageResource(R.drawable.ic_nofavorite)
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            param1 = it.getString(ARG_PARAM1)
            param2 = it.getString(ARG_PARAM2)
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment

        val favoriteClick: ImageView = binding.root.findViewById(R.id.rate_user_favorite)

        favoriteClick.setOnClickListener{
            favoriteClick.setImageResource(R.drawable.ic_nofavorite)
        }

        return inflater.inflate(R.layout.fragment_favorite, container, false)
    }

    companion object {
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            FavoriteFragment().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }
    }
}